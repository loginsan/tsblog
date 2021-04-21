import React, { Dispatch, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Pagination } from 'antd';
import { asyncGetArticles, setCurrentPage, ArticlesAction, asyncSetFavorite } from '../../store/articlesActions';
import { ArticlesState } from '../../store/articlesReducer';
import { Article } from '../../types';
import * as kit from '../../common';


type ClickLink = (
  evt: React.MouseEvent<HTMLAnchorElement>,
  slug: string | undefined,
  favorited: boolean | undefined,
  token: string
) => void;


function renderArticleShort(
  props: Article,
  token: string,
  favorite: ClickLink
): React.ReactNode {

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
          <Link to="/sign-up" 
            className={likeClass} 
            title={favorited? 'Remove from Favorite' : 'Add to Favorite'}
            onClick={(evt) => favorite(evt, slug, favorited, token)}
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
  const [cookies] = useCookies(['token']);
  const userToken = cookies.token || '';

  function toggleFavorite(
    evt: React.MouseEvent<HTMLAnchorElement>,
    slug: string | undefined,
    favorited: boolean | undefined,
    token: string
  ) {
    if (token) {
      evt.preventDefault();
      // console.log(slug, favorited);
      dispatch( asyncSetFavorite(slug || '', !!favorited, token) );
    }
  }
  
  useEffect(() => {
    kit.setPageTitle(`Articles, page ${page}`);
    dispatch( asyncGetArticles(page, userToken) );
  }, [dispatch, page, userToken]);

  const articles = !loading && !error && (
    <ul className="article-list nolist">
      { list.map(article => (
          <li key={ article.slug } className="article article_short">
            { renderArticleShort(article, userToken, toggleFavorite) }
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
      { kit.elemLoading(loading) }
      { kit.elemAlert(error) }
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
