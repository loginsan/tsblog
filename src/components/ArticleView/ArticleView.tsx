import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { connect, useStore, useDispatch } from 'react-redux';
import { Alert } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { asyncViewArticle } from '../../store/actions';
import { IArticleState } from '../../store/singleReducer';
import { ArticleType } from '../../types';
import { formatDate, avatarFallback, randomArticleImage } from '../../common';


const renderArticleFull = (props: ArticleType): React.ReactNode => {
  const { slug, title, description, tagList, body, 
    updatedAt, favorited, favoritesCount, author } = props;
  const likeClass: string = `like${favorited? "" : " like_unset"}`;
  return (
  <article className="article article_full">
    {/* {<picture>{ randomArticleImage() }</picture>} */}
    <header className="article__head">
      <div className="article__info">
        <h2>
          <Link className="article__title" to="/articles/">{title}</Link>
          <Link to="/sign-up" className={likeClass} title={slug}>
            {favoritesCount}
          </Link>
        </h2>
        <ul className="article__tag-list nolist">
          { tagList.map((el, index) => (
            <li key={el} className={`tag${index === 0? " tag_main" : ""}`}>
              <Link to="/" title="Tag functional is incomplete in this release">{el}</Link>
            </li>
          ))}
        </ul>
        <p className="article__excerpt">{description}</p>
      </div>
      <aside className="pub-info">
        <Link to="/profile" className="author" title="Author">
          <span>
            { author.username }
            <time className="pub-date">{ formatDate(updatedAt) }</time>
          </span>
          <img src={ author.image } title={ author.bio } 
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
      { body }
      </ReactMarkdown>
    </main>
  </article>
  )
};


interface IArticleViewProps {
  id: string,
}

const ArticleView: React.FC<IArticleViewProps> = ({ id }) => {
  
  const store = useStore();
  const dispatch = useDispatch();
  const { loading, error, article } = store.getState().view;
  console.log(id, loading, error, article);

  useEffect(() => {
    dispatch(asyncViewArticle(id));
    // console.log("changeq");
  }, [id]);

  const elemLoading = loading && <div className="loading"><LoadingOutlined /></div>;
  const elemAlert = !!error && <Alert className="alert-box" message="Error ocured" description={error} type="error" showIcon />;
  const elemArticle = !loading && !error && (
    <>
    { renderArticleFull(article) }
    </>
  );

  return (
    <section className="page">
      { elemLoading }
      { elemAlert }
      { elemArticle }
    </section>
  );
}

const mapStateToProps = (state: {view: IArticleState}) => ({
  loading: state.view.loading, 
  error: state.view.error,
  article: state.view.article,
});

// const mapDispatchToProps = (dispatchFn: Dispatch<ArticleActionType>) => ({
//   pageChange: (num: number) => dispatchFn(setCurrentPage(num)),
// });

export default connect(mapStateToProps, {})(ArticleView);
// export default ArticleView;
