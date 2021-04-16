import { Article, ArticleResponse } from '../types';
import { ArticleAction } from './articlesActions';
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
        article: (action.payload as ArticleResponse).article,
      };

    default:
      return state;
  }
};
