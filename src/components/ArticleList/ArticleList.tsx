import React, { Dispatch, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { Pagination } from 'antd';
import { asyncGetArticles, setCurrentPage, ArticlesAction } from '../../store/actions';
import { formatDate, avatarFallback, placeTags, elemLoading, elemAlert } from '../../common';
import { Article } from '../../types';
import { ArticlesState } from '../../store/articlesReducer';


function renderArticleShort(props: Article): React.ReactNode {
  const { slug, title, description, tagList, 
    updatedAt, favorited, favoritesCount, author } = props;
  const likeClass = `like${favorited? "" : " like_unset"}`;
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
        { placeTags(tagList) }
        <p className="article__excerpt">{description}</p>
      </div>
      <aside className="pub-info">
        <Link to="/profile" className="author" title="Author">
          <span>
            { author && author.username }
            <time className="pub-date">{ formatDate(updatedAt) }</time>
          </span>
          <img src={ author && author.image } title={ author && author.bio } 
            alt="Avatar" className="avatar"
            onError={ avatarFallback }
          />
        </Link>
      </aside>
    </header>
  </>
  )
}


interface ArticleListProps {
  loading: boolean,
  error: string,
  page: number,
  list: Article[],
  total: number,
  pageChange: (num: number) => void,
}


const ArticleList: React.FC<ArticleListProps> = (props) => {
  const { loading, error, page, list, total, pageChange } = props;
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch( asyncGetArticles(page) );
  }, [dispatch, page]);

  const articles = !loading && !error && (
    <ul className="article-list nolist">
      { list.map(article => (
          <li key={ article.slug } className="article article_short">
            { renderArticleShort(article) }
          </li>
        ))
      }        
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
      { elemLoading(loading) }
      { elemAlert(error) }
      { articles }
      { elemPager }
    </section>
  )
};

const mapStateToProps = (state: {articles: ArticlesState}) => ({
  loading: state.articles.loading, 
  error: state.articles.error,
  page: state.articles.page,
  list: state.articles.list,
  total: state.articles.total,
});

const mapDispatchToProps = (dispatchFn: Dispatch<ArticlesAction>) => ({
  pageChange: (num: number) => dispatchFn( setCurrentPage(num) ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
