import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import cn from 'classnames';
import {
  asyncGetArticle,
  asyncGetComments,
  asyncSetFavorite,
  asyncDeleteArticle
} from '../../store/single/actions';
import { ArticleState } from '../../store/single/types';
import { UserState } from '../../store/user/types';
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
  const dispatch = useDispatch();
  const [cookies] = useCookies(['token']);
  const userToken = cookies.token || '';

  const { title, description, tagList, body, 
    updatedAt, favorited, favoritesCount, author } = article;
  kit.setPageTitle(title);
  const elemComments = <CommentsList data={comments} token={userToken} />;


  const [deleted, setDeleted] = useState(false);
  const [hiddenConfirm, setHiddenConfirm] = useState(true);

  function deleteArticleClick(evt: React.MouseEvent<HTMLAnchorElement>) {
    evt.preventDefault();
    setHiddenConfirm(false);
  }

  function noDeleteClick(evt: React.MouseEvent<HTMLButtonElement>) {
    setHiddenConfirm(true);
  }

  function yesDeleteClick(evt: React.MouseEvent<HTMLButtonElement>) {
    setHiddenConfirm(true);
    dispatch( asyncDeleteArticle(slug, userToken) );
    setDeleted(true);
  }

  const elemControls = user !== undefined && author !== undefined && 
    user.username === author.username && (
    <div className={cn("edit-links")}>
      <Link to="/" 
        className={cn("link", "link_delete-article")}
        onClick={deleteArticleClick}
      >
        Delete
      </Link>
      <Link to={`/articles/${slug}/edit`} className={cn("link", "link_edit-article")}>
        Edit
      </Link>
      <div className={cn('delete-confirm', { 'hide' : hiddenConfirm })}>
        <span>Are you sure to delete this article?</span>
        <button type="button" className={cn("btn")} onClick={noDeleteClick}>
          No
        </button>
        <button type="button" 
          className={cn("btn", "btn_primary")}
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

  const elemArticle = !loading && !error && !deleted && (
    <article className={cn("article", "article_full")}>
      <header className={cn("article__head")}>
        <div className={cn("article__info")}>
          <h2>
            <Link className={cn("article__title")} to="/articles/" title={title}>{title}</Link>
            <Link to="/sign-in" 
              className={cn('like', { 'like_unset': !favorited })}
              title={favorited? 'Remove from Favorite' : 'Add to Favorite'}
              onClick={toggleFavorite}
            >
              {favoritesCount}
            </Link>
          </h2>
          { kit.placeTags(tagList) }
          <p className={cn("article__excerpt")}>{description}</p>
        </div>
        <aside className={cn("pub-info")}>
          <Link
            to={`/profiles/${ encodeURI(author.username) }`}
            className={cn("author")}
            title="Author"
          >
            <span>
              { author.username }
              <time className={cn("pub-date")} title={updatedAt}>
                { kit.formatDate(updatedAt) }
              </time>
            </span>
            <img src={ author.image } title={ author.bio } 
              alt="Avatar" className={cn("avatar")}
              onError={ kit.avatarFallback }
            />
          </Link>

          { elemControls }

        </aside>
      </header>

      { body && (<main className={cn("article__markdown")}>  
          <ReactMarkdown plugins={[gfm]}>{ body }</ReactMarkdown>
        </main>)
      }
      <hr />
      { elemComments }
    </article>
  );

  return (
    <section className={cn("page")}>
      { kit.elemLoading(loading) }
      { kit.elemAlert(error) }
      { !loading && !error && deleted && (
        <article className={cn("article", "article_full")}>
          { kit.notifyBox("Article have been deleted", 
            "Have a nice time in Realworld Blog!") }
        </article>
        )
      }
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

export default connect(mapStateToProps, {})(ArticleView);
