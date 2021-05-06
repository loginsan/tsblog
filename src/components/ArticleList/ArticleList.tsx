import React, { Dispatch, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Pagination, Popover } from 'antd';
import cn from 'classnames';
import {
  Article, 
  ArticlesState, 
  ArticlesAction 
} from '../../store/articles/types';
import {
  asyncGetArticles,
  setCurrentPage, 
} from '../../store/articles/actions';
import { asyncSetFavorite } from '../../store/single/actions';
import * as kit from '../../common';


type ClickLink = (
  evt: React.MouseEvent<HTMLAnchorElement>,
  slug: string,
  favorited: boolean,
  token: string
) => void;


function renderArticleShort(
  props: Article,
  token: string,
  favorite: ClickLink
): React.ReactNode {

  const { slug, title, description, tagList, 
    updatedAt, favorited, favoritesCount, author } = props;
  const LikeLink = (<Link to="/sign-in" 
    className={cn('like', { 'like_unset': !favorited })} 
    title={favorited? 'Remove from Favorite' : 'Add to Favorite'}
    onClick={(evt) => favorite(evt, slug, favorited, token)}
  >
    {favoritesCount}
  </Link>);
  const PopoverLink = (
    <Popover 
      content={ kit.guestPop }
      trigger="click"
      title="Like article?" 
      placement="right"
    >
      { LikeLink }
    </Popover>
  );

  return (
    <header className={cn("article__head")}>
      <div className={cn("article__info")}>
        <h2>
          <Link className={cn("article__title")} to={`/articles/${slug}`}>{title}</Link>
          { token === ''? PopoverLink : LikeLink }
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
      </aside>
    </header>
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
  let mainTitle = '';
  let mainAuthor = '';

  function toggleFavorite(
    evt: React.MouseEvent<HTMLAnchorElement>,
    slug: string,
    favorited: boolean,
    token: string
  ) {
    if (token) {
      evt.preventDefault();
      dispatch( asyncSetFavorite(slug, !!favorited, token) );
    }
  }
  
  useEffect(() => {
    kit.setPageTitle(`Articles, page ${page}`);
    dispatch( asyncGetArticles(page, userToken) );
  }, [dispatch, page, userToken]);

  const articles = !loading && !error && (
    <ul className={cn("article-list", "nolist")}>
      { list.map(article => {
          const { title, slug, author } = article;
          const isClone = title === mainTitle && author.username === mainAuthor;
          if (!isClone) {
            mainTitle = title;
            mainAuthor = author.username;
          }
          return (
            <li
              key={ slug }
              className={cn('article', 'article_short', { 'article_clone': isClone })}
            >
              { renderArticleShort(article, userToken, toggleFavorite) }
            </li>
          )
        })
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
    <section className={cn("page")}>
      { kit.elemLoading(loading) }
      { kit.elemAlert(error) }
      { articles }
      { elemPager }
    </section>
  )
}

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
