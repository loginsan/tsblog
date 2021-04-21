import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { asyncGetArticle, asyncGetComments, asyncSetFavorite } from '../../store/articlesActions';
import { ArticleState } from '../../store/singleReducer';
import { UserState } from '../../store/userReducer';
import { Article, Comment, User } from '../../types';
import CommentsList from '../CommentsList';
import * as kit from '../../common';


type ClickLink = (evt: React.MouseEvent<HTMLAnchorElement>) => void;


function renderArticleFull(
  props: Article,
  comments: Comment[],
  token: string,
  favorite: ClickLink,
  username: string
): React.ReactNode {

  const { title, description, tagList, body, 
    updatedAt, favorited, favoritesCount, author } = props;
  kit.setPageTitle(title);
  const likeClass = `like${favorited? "" : " like_unset"}`;
  const elemComments = <CommentsList data={comments} token={token} />;

  const elemControls = username === author!.username && (
    <div className="edit-links">
      <Link to="/" className="link link_delete-article">Delete</Link>
      <Link to="/articles/start/edit" className="link link_edit-article">Edit</Link>
      <div className="delete-confirm hide">
        <span>Are you sure to delete this article?</span>
        <button type="button" className="btn">No</button>
        <button type="button" className="btn btn_primary">Yes</button>
      </div>
    </div>);

  return (
  <article className="article article_full">
    {/* {<picture>{ randomArticleImage() }</picture>} */}
    <header className="article__head">
      <div className="article__info">
        <h2>
          <Link className="article__title" to="/articles/" title={title}>{title}</Link>
          <Link to="/sign-up" 
            className={likeClass} 
            title={favorited? 'Remove from Favorite' : 'Add to Favorite'}
            onClick={favorite}
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
            <time className="pub-date">{ kit.formatDate(updatedAt) }</time>
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
      <hr />
      { elemComments }
    </main>
  </article>
  )
};


interface ArticleViewProps {
  id: string,
  loading: boolean, 
  error: string,
  article: Article,
  comments: Comment[],
  user: User,
}

const ArticleView: React.FC<ArticleViewProps> = (props) => {
  const { id, loading, error, article, comments, user } = props;
  const dispatch = useDispatch();
  const [cookies] = useCookies(['token']);
  const userToken = cookies.token || '';

  function toggleFavorite(evt: React.MouseEvent<HTMLAnchorElement>) {
    if (userToken) {
      evt.preventDefault();
      dispatch( asyncSetFavorite(id, !!article.favorited, userToken) );
    }
  }

  useEffect(() => {
    dispatch( asyncGetArticle(id, userToken) );
    dispatch( asyncGetComments(id, userToken) );
  }, [dispatch, id, userToken]);

  const elemArticle = !loading && !error && (
    <>
    { renderArticleFull(article, comments, userToken, toggleFavorite, user.username || '') }
    </>
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
