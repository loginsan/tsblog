import { Article, ArticleData } from '../types';
import { ArticleAction } from './articlesActions';
import {
  EDIT_ARTICLE_FETCHING,
  EDIT_ARTICLE_ERROR,
  EDIT_ARTICLE_SUCCESS,
} from './constants';


export interface EditState {
  loading: boolean,
  error: string,
  article: Article,
}

const initialState: EditState = {
  loading: false,
  error: '',
  article: {},
};

export default function edit(
  state = initialState, 
  action: ArticleAction
): EditState {
  
  switch (action.type) {
    case EDIT_ARTICLE_FETCHING:
      return { 
        ...state,
        error: '',
        loading: action.payload as boolean,
      };
    
    case EDIT_ARTICLE_ERROR:
      return { 
        ...state, 
        error: action.payload as string,
        loading: false
      };
    
    case EDIT_ARTICLE_SUCCESS:
      return { 
        ...state, 
        loading: false,
        article: (action.payload as ArticleData).article,
      };

    default:
      return state;
  }
};
