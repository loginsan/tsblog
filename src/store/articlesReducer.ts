import { Article, ArticlesResponse } from '../types';
import { ArticlesAction } from './articlesActions';
import {
  LOAD_ARTICLES,
  LOAD_ARTICLES_ERROR,
  LOAD_ARTICLES_LOADING,
  SET_CURRENT_PAGE,
} from './constants';


export interface ArticlesState {
  loading: boolean,
  error: string,
  page: number,
  list: Article[],
  total: number,
  tag: string | null,
}

const initialState: ArticlesState = {
  loading: true,
  error: '',
  page: 1,
  list: [],
  total: 0,
  tag: null,
};

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
      };
    
    case LOAD_ARTICLES_ERROR:
      return { 
        ...state, 
        loading: false,
        error: action.payload as string,
      };
    
    case LOAD_ARTICLES: {
      const data = action.payload as ArticlesResponse;
      return { 
        ...state, 
        loading: false,
        list: data.articles,
        total: data.articlesCount,
      }
    }
    
    case SET_CURRENT_PAGE:
      return { ...state, page: action.payload as number };

    default:
      return state;
  }
}
