import React, { Dispatch, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { Alert, Pagination } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { asyncMoreArticles, setCurrentPage, ArticlesActionTypes } from '../../store/actions';
import { ArticleType } from '../../types';
import { IArticlesState } from '../../store/articlesReducer';
import { formatDate, avatarFallback, randomArticleImage } from '../../common';


const renderArticleShort = (props: ArticleType): React.ReactNode => {
  const { slug, title, description, tagList, 
    updatedAt, favorited, favoritesCount, author } = props;
  const likeClass: string = `like${favorited? "" : " like_unset"}`;
  return (
  <>
    {/* {<Link to={`/articles/${slug}`}>{ randomArticleImage() }</Link>} */}
    <header className="article__head">
      <div className="article__info">
        <h2>
          <Link className="article__title" to={`/articles/${slug}`}>{title}</Link>
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
      </aside>
    </header>
  </>
  )
}



interface IArticleListProps {
  loading: Boolean,
  error: string,
  page: number,
  list: Array<ArticleType>,
  total: number,
  pageChange: (num: number) => void,
}


const ArticleList: React.FC<IArticleListProps> = ({
  loading, error, page, list, total, pageChange })=> {
  
  // const { store } = useContext(ReactReduxContext);
  const dispatch = useDispatch();
  
  useEffect(() => {
    // api.getArticles()
    //   .then(data => {
    //     console.log(data.articles[0]);
    //   })
    dispatch(asyncMoreArticles(page));
  }, [dispatch, page]);

  const elemLoading = loading && <div className="loading"><LoadingOutlined /></div>;
  const elemAlert = !!error && <Alert className="alert-box" message="Error ocured" description={error} type="error" showIcon />;
  const articles = !loading && !error && (
    <ul className="article-list nolist">
      { list.map(article => (
        <li key={ article.slug } className="article article_short">
          { renderArticleShort(article) }
        </li>
      )) }        
    </ul>
  );
  const elemPager = !loading && !error && (
    <Pagination
      onChange={(num) => { pageChange(num) }}
      current={page}
      defaultPageSize={20}
      showTitle={false}
      showSizeChanger={false}
      total={total}
    />
  );

  return (
    <section className="page">
      { elemLoading }
      { elemAlert }
      { articles }
      { elemPager }
    </section>
  )
  };

const mapStateToProps = (state: {articles: IArticlesState}) => ({
  loading: state.articles.loading, 
  error: state.articles.error,
  page: state.articles.page,
  list: state.articles.list,
  total: state.articles.total,
});

const mapDispatchToProps = (dispatchFn: Dispatch<ArticlesActionTypes>) => ({
  pageChange: (num: number) => dispatchFn(setCurrentPage(num)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
