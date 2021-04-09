import { ArticleType } from '../types';
import { 
  ArticleActionType, 
  IArticleLoading, 
  IArticleError, 
  IArticleView, 
} from './actions';
import {
  VIEW_ARTICLE,
  VIEW_ARTICLE_LOADING,
  VIEW_ARTICLE_ERROR,
} from './constants';


export interface IArticleState {
  loading: Boolean,
  error: string,
  article: ArticleType,
}

const initialState: IArticleState = {
  loading: true,
  error: "",
  article: {
    "slug": "",
    "title": "",
    "description": "",
    "body": "",
    "tagList": [],
    "createdAt": "",
    "updatedAt": "",
    "favorited": false,
    "favoritesCount": 0,
    "author": {
      "username": "",
      "bio": "",
      "image": "",
      "following": false
    },
  },
};

const view = (
  state = initialState, 
  action: ArticleActionType
): IArticleState => {
  switch (action.type) {
    case VIEW_ARTICLE_LOADING:
      return { 
        ...state,
        error: "",
        loading: (action as IArticleLoading).flag
      };
    
    case VIEW_ARTICLE_ERROR:
      return { 
        ...state, 
        error: (action as IArticleError).error,
        loading: false
      };
    
    case VIEW_ARTICLE:
      return { 
        ...state, 
        loading: false,
        article: (action as IArticleView).data.article,
      };

    default:
      return state;
  }
};

export default view;
