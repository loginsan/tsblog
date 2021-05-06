import {
  LOAD_ARTICLES,
  LOAD_ARTICLES_ERROR,
  LOAD_ARTICLES_LOADING,
  SET_CURRENT_PAGE,
  FAVORITE_ARTICLE_FETCHING,
  FAVORITE_ARTICLE_ERROR,
  FAVORITE_ARTICLE,
} from '../constants';
import {
  ArticlesData,
  ArticleData,
  ArticlesAction,
  ArticlesState,
} from './types';


const initialState: ArticlesState = {
  loading: true,
  error: '',
  page: 1,
  list: [],
  total: 0,
  tag: null,
  favoriteFetching: false,
  favoriteError: '',
}

export default function articles(
  state = initialState, 
  action: ArticlesAction
): ArticlesState {
  
  switch (action.type) {
    case LOAD_ARTICLES_LOADING:
      return { 
        ...state,
        loading: action.payload as boolean,
        error: '',
      }
    
    case LOAD_ARTICLES_ERROR:
      return { 
        ...state, 
        loading: false,
        error: action.payload as string,
      }
    
    case LOAD_ARTICLES: {
      const data = action.payload as ArticlesData;
      return { 
        ...state, 
        loading: false,
        list: data.articles,
        total: data.articlesCount,
      }
    }
    
    case SET_CURRENT_PAGE:
      return { ...state, page: action.payload as number };
    
    case FAVORITE_ARTICLE_FETCHING:
      return {
        ...state,
        favoriteError: '',
        favoriteFetching: action.payload as boolean,
      }
    
    case FAVORITE_ARTICLE_ERROR:
      return {
        ...state,
        favoriteError: action.payload as string,
        favoriteFetching: false,
      }
    
    case FAVORITE_ARTICLE: {
      const updated = (action.payload as ArticleData).article;
      const { slug, favorited, favoritesCount } = updated;
      return {
        ...state,
        favoriteFetching: false,
        list: state.list.map(elem => {
          if (elem.slug === slug) {
            return {
              ...elem,
              favorited,
              favoritesCount,
            }
          }
          return elem;
        }),
      }
    }

    default:
      return state;
  }
}
