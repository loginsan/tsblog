import { Article, ArticleData, Comment, CommentsData } from '../types';
import { ArticleAction } from './articlesActions';
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
} from './constants';


export interface ArticleState {
  loading: boolean,
  error: string,
  article: Article,
  comments: Comment[],
  commentsLoading: boolean,
  commentsError: string,
  favoriteFetching: boolean,
  favoriteError: string,
}

const initialState: ArticleState = {
  loading: true,
  error: '',
  article: {},
  comments: [],
  commentsLoading: true,
  commentsError: '',
  favoriteFetching: false,
  favoriteError: '',
};

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
      };
    
    case VIEW_ARTICLE_ERROR:
      return { 
        ...state, 
        error: action.payload as string,
        loading: false
      };
    
    case VIEW_ARTICLE:
      return { 
        ...state, 
        loading: false,
        article: (action.payload as ArticleData).article,
      };

    case FETCH_COMMENTS_LOADING:
      return { 
        ...state,
        commentsError: '',
        commentsLoading: action.payload as boolean,
      };
    
    case FETCH_COMMENTS_ERROR:
      return { 
        ...state, 
        commentsError: action.payload as string,
        commentsLoading: false
      };
    
    case FETCH_COMMENTS:
      return { 
        ...state, 
        commentsLoading: false,
        comments: (action.payload as CommentsData).comments,
      };
    
    case FAVORITE_ARTICLE_FETCHING:
      return {
        ...state,
        favoriteError: '',
        favoriteFetching: action.payload as boolean,
      };
    
    case FAVORITE_ARTICLE_ERROR:
      return {
        ...state,
        favoriteError: action.payload as string,
        favoriteFetching: false,
      };
    
    case FAVORITE_ARTICLE:
      return {
        ...state,
        favoriteFetching: false,
        article: (action.payload as ArticleData).article,
      };
    

    default:
      return state;
  }
};
