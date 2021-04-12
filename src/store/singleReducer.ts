import { Article } from '../types';
import { 
  ArticleAction, 
  ArticleLoading, 
  ArticleError, 
  ArticleView, 
} from './actions';
import {
  VIEW_ARTICLE,
  VIEW_ARTICLE_LOADING,
  VIEW_ARTICLE_ERROR,
} from './constants';


export interface ArticleState {
  loading: boolean,
  error: string,
  article: Article,
}

const initialState: ArticleState = {
  loading: true,
  error: '',
  article: {},
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
        loading: (action as ArticleLoading).flag
      };
    
    case VIEW_ARTICLE_ERROR:
      return { 
        ...state, 
        error: (action as ArticleError).error,
        loading: false
      };
    
    case VIEW_ARTICLE:
      return { 
        ...state, 
        loading: false,
        article: (action as ArticleView).data.article,
      };

    default:
      return state;
  }
};
