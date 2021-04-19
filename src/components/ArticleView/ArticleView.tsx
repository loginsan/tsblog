import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { connect, useStore, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { asyncGetArticle, asyncGetComments } from '../../store/articlesActions';
import { ArticleState } from '../../store/singleReducer';
import { Article, Comment } from '../../types';
import CommentsList from '../CommentsList';
import { formatDate, avatarFallback, placeTags, elemLoading, elemAlert } from '../../common';


function renderArticleFull(
  props: Article,
  comments: Comment[],
  token: string
): React.ReactNode {
  const { slug, title, description, tagList, body, 
    updatedAt, favorited, favoritesCount, author } = props;
  const likeClass = `like${favorited? "" : " like_unset"}`;
  const elemComments = <CommentsList data={comments} token={token} />;
  return (
  <article className="article article_full">
    {/* {<picture>{ randomArticleImage() }</picture>} */}
    <header className="article__head">
      <div className="article__info">
        <h2>
          <Link className="article__title" to="/articles/" title={title}>{title}</Link>
          <Link to="/sign-up" className={likeClass} title={slug}>
            {favoritesCount}
          </Link>
        </h2>
        { placeTags(tagList) }
        <p className="article__excerpt">{description}</p>
      </div>
      <aside className="pub-info">
        <Link to={`/profiles/${author && author.username}`} className="author" title="Author">
          <span>
            { author && author.username }
            <time className="pub-date">{ formatDate(updatedAt) }</time>
          </span>
          <img src={ author && author.image } title={ author && author.bio } 
            alt="Avatar" className="avatar"
            onError={ avatarFallback }
          />
        </Link>

        <div className="edit-links">
          <Link to="/" className="link link_delete-article">Delete</Link>
          <Link to="/articles/start/edit" className="link link_edit-article">Edit</Link>
          <div className="delete-confirm hide">
            <span>Are you sure to delete this article?</span>
            <button type="button" className="btn">No</button>
            <button type="button" className="btn btn_primary">Yes</button>
          </div>
        </div>

      </aside>
    </header>

    <main className="article__markdown">
      <ReactMarkdown>
      { body || '' }
      </ReactMarkdown>
      <hr />
      { elemComments }
    </main>
  </article>
  )
};


interface ArticleViewProps {
  id: string,
}

const ArticleView: React.FC<ArticleViewProps> = ({ id }) => {
  const store = useStore();
  const dispatch = useDispatch();
  const { loading, error, article, comments } = store.getState().view;
  const [cookies] = useCookies(['token']);
  const userToken = cookies.token || '';

  useEffect(() => {
    dispatch( asyncGetArticle(id) );
    dispatch( asyncGetComments(id, userToken) );
  }, [dispatch, id, userToken]);

  const elemArticle = !loading && !error && (
    <>
    { renderArticleFull(article, comments, userToken) }
    </>
  );

  return (
    <section className="page">
      { elemLoading(loading) }
      { elemAlert(error) }
      { elemArticle }
    </section>
  );
}

const mapStateToProps = (state: {view: ArticleState}) => ({
  loading: state.view.loading, 
  error: state.view.error,
  article: state.view.article,
  comments: state.view.comments,
});

// const mapDispatchToProps = (dispatchFn: Dispatch<ArticleAction>) => ({
// 
// });

export default connect(mapStateToProps, {})(ArticleView);
