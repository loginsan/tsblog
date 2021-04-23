import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { asyncGetArticle, asyncGetComments, asyncSetFavorite, asyncDeleteArticle } from '../../store/articlesActions';
import { ArticleState } from '../../store/singleReducer';
import { UserState } from '../../store/userReducer';
import { Article, Comment, User } from '../../types';
import CommentsList from '../CommentsList';
import * as kit from '../../common';


interface ArticleViewProps {
  slug: string,
  loading: boolean, 
  error: string,
  article: Article,
  comments: Comment[],
  user: User,
}

const ArticleView: React.FC<ArticleViewProps> = (props) => {
  const { slug, loading, error, article, comments, user } = props;
  console.log(user);
  const dispatch = useDispatch();
  const [cookies] = useCookies(['token']);
  const userToken = cookies.token || '';

  const { title, description, tagList, body, 
    updatedAt, favorited, favoritesCount, author } = article;
  kit.setPageTitle(title);
  const likeClass = `like${favorited? "" : " like_unset"}`;
  const elemComments = <CommentsList data={comments} token={userToken} />;


  const [deleted, setDeleted] = useState(false);
  const deletePromptRef = useRef<HTMLDivElement>(null);
  function deleteArticleClick(evt: React.MouseEvent<HTMLAnchorElement>) {
    evt.preventDefault();
    kit.setElemVisibility(deletePromptRef.current, true);
  };
  function noDeleteClick(evt: React.MouseEvent<HTMLButtonElement>) {
    kit.setElemVisibility(deletePromptRef.current, false);
  };
  function yesDeleteClick(evt: React.MouseEvent<HTMLButtonElement>) {
    kit.setElemVisibility(deletePromptRef.current, false);
    console.log('async delete fetching');
  };
// user.username === author!.username
  const elemControls = user !== undefined && author !== undefined && user.username === author!.username && (
    <div className="edit-links">
      <Link to="/" 
        className="link link_delete-article"
        onClick={deleteArticleClick}
      >
        Delete
      </Link>
      <Link to={`/articles/${slug}/edit`} className="link link_edit-article">
        Edit
      </Link>
      <div className="delete-confirm hide" ref={deletePromptRef}>
        <span>Are you sure to delete this article?</span>
        <button type="button" className="btn" onClick={noDeleteClick}>
          No
        </button>
        <button type="button" 
          className="btn btn_primary"
          onClick={yesDeleteClick}
        >
          Yes
        </button>
      </div>
    </div>);

  function toggleFavorite(evt: React.MouseEvent<HTMLAnchorElement>) {
    if (userToken) {
      evt.preventDefault();
      dispatch( asyncSetFavorite(slug, !!article.favorited, userToken) );
    }
  }

  useEffect(() => {
    dispatch( asyncGetArticle(slug, userToken) );
    dispatch( asyncGetComments(slug, userToken) );
  }, [dispatch, slug, userToken]);

  const elemArticle = !loading && !error && (
    <article className="article article_full">
      {/* {<picture>{ randomArticleImage() }</picture>} */}
      <header className="article__head">
        <div className="article__info">
          <h2>
            <Link className="article__title" to="/articles/" title={title}>{title}</Link>
            <Link to="/sign-in" 
              className={likeClass} 
              title={favorited? 'Remove from Favorite' : 'Add to Favorite'}
              onClick={toggleFavorite}
            >
              {favoritesCount}
            </Link>
          </h2>
          { kit.placeTags(tagList) }
          <p className="article__excerpt">{description}</p>
        </div>
        <aside className="pub-info">
          <Link to={`/profiles/${ encodeURI(author && author.username || '') }`} className="author" title="Author">
            <span>
              { author && author.username }
              <time className="pub-date" title={updatedAt}>
                { kit.formatDate(updatedAt) }
              </time>
            </span>
            <img src={ author && author.image } title={ author && author.bio } 
              alt="Avatar" className="avatar"
              onError={ kit.avatarFallback }
            />
          </Link>

          { elemControls }

        </aside>
      </header>

      <main className="article__markdown">  
        <ReactMarkdown plugins={[gfm]}>{ body || '' }</ReactMarkdown>
      </main>
      <hr />
      { elemComments }
    </article>
  );

  return (
    <section className="page">
      { kit.elemLoading(loading) }
      { kit.elemAlert(error) }
      { elemArticle }
    </section>
  );
}

const mapStateToProps = (state: {view: ArticleState, user: UserState}) => ({
  loading: state.view.loading, 
  error: state.view.error,
  article: state.view.article,
  comments: state.view.comments,
  user: state.user.user,
});

// const mapDispatchToProps = (dispatchFn: Dispatch<ArticleAction>) => ({
// 
// });

export default connect(mapStateToProps, {})(ArticleView);
