import {
  VIEW_ARTICLE,
  VIEW_ARTICLE_LOADING,
  VIEW_ARTICLE_ERROR,
  FETCH_COMMENTS_LOADING,
  FETCH_COMMENTS_ERROR,
  FETCH_COMMENTS,
  FAVORITE_ARTICLE_FETCHING,
  FAVORITE_ARTICLE_ERROR,
  FAVORITE_ARTICLE,
  DELETE_ARTICLE,
} from '../constants';
import { 
  ArticleState,
  ArticleAction,
  ArticleData,
  CommentsData,
  Article,
} from './types';

const defaultArticle: Article = {
  createdAt: '',
  updatedAt: '',
  body: '',
  author: { username: '' },
  slug: '',
  title: '',
  description: '',
  favorited: false,
  favoritesCount: 0,
}

const initialState: ArticleState = {
  loading: true,
  error: '',
  article: defaultArticle,
  comments: [],
  commentsLoading: true,
  commentsError: '',
  favoriteFetching: false,
  favoriteError: '',
}

export default function view(
  state = initialState, 
  action: ArticleAction
): ArticleState {
  
  switch (action.type) {
    case VIEW_ARTICLE_LOADING:
      return { 
        ...state,
        error: '',
        loading: action.payload as boolean,
      }
    
    case VIEW_ARTICLE_ERROR:
      return { 
        ...state, 
        error: action.payload as string,
        loading: false
      }
    
    case VIEW_ARTICLE:
      return { 
        ...state, 
        loading: false,
        article: (action.payload as ArticleData).article,
      }

    case DELETE_ARTICLE:
      return {
        ...state,
        loading: false,
        article: defaultArticle,
      }

    case FETCH_COMMENTS_LOADING:
      return { 
        ...state,
        commentsError: '',
        commentsLoading: action.payload as boolean,
      }
    
    case FETCH_COMMENTS_ERROR:
      return { 
        ...state, 
        commentsError: action.payload as string,
        commentsLoading: false
      }
    
    case FETCH_COMMENTS:
      return { 
        ...state, 
        commentsLoading: false,
        comments: (action.payload as CommentsData).comments,
      }
    
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
    
    case FAVORITE_ARTICLE:
      return {
        ...state,
        favoriteFetching: false,
        article: (action.payload as ArticleData).article,
      }

    default:
      return state;
  }
}
