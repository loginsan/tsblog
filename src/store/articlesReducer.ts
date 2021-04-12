import { Article } from '../types';
import { 
  ArticlesAction, 
  ArticlesLoading, 
  ArticlesError, 
  ArticlesSuccess, 
  PageNum,
} from './actions';
import {
  APPEND_ARTICLES,
  APPEND_ARTICLES_ERROR,
  APPEND_ARTICLES_LOADING,
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
    case APPEND_ARTICLES_LOADING:
      return { 
        ...state,
        error: '',
        loading: (action as ArticlesLoading).flag
      };
    
    case APPEND_ARTICLES_ERROR:
      return { 
        ...state, 
        error: (action as ArticlesError).error,
        loading: false
      };
    
    case APPEND_ARTICLES:
      return { 
        ...state, 
        loading: false,
        list: (action as ArticlesSuccess).data.articles,
        total: (action as ArticlesSuccess).data.articlesCount
      };
    
    case SET_CURRENT_PAGE:
      return { ...state, page: (action as PageNum).page };

    default:
      return state;
  }
}
