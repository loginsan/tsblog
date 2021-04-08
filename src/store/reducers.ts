import { combineReducers } from "redux";
import { ArticleType } from '../types';
import { ArticlesActionTypes, IArticlesLoading, IArticlesError, IArticlesSuccess, IPageNum } from './actions';
import {
  APPEND_ARTICLES,
  APPEND_ARTICLES_ERROR,
  APPEND_ARTICLES_LOADING,
  SET_CURRENT_PAGE,
  // SET_CURRENT_TAG,
  // VIEW_ARTICLE_ID,
} from './constants';

export interface IArticlesState {
  loading: Boolean,
  error: string,
  page: number,
  list: Array<ArticleType>,
  total: number,
  tag: string | null,
  view: string,
}

const initialArticles: IArticlesState = {
  loading: true,
  error: "",
  page: 1,
  list: [],
  total: 0,
  tag: null,
  view: "",
};

const articles = (state = initialArticles, action: ArticlesActionTypes): IArticlesState => {
  switch (action.type) {
    case APPEND_ARTICLES_LOADING:
      return { 
        ...state,
        error: "",
        loading: (action as IArticlesLoading).flag
      };
    
    case APPEND_ARTICLES_ERROR:
      return { 
        ...state, 
        error: (action as IArticlesError).error,
        loading: false
      };
    
    case APPEND_ARTICLES:
      return { 
        ...state, 
        loading: false,
        list: (action as IArticlesSuccess).data.articles,
        total: (action as IArticlesSuccess).data.articlesCount
      };
    
    case SET_CURRENT_PAGE:
      return { ...state, page: (action as IPageNum).page };

    default:
      return state;
  }
};


const reducer = combineReducers({ articles });

export default reducer;
