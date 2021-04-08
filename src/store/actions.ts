import { Dispatch } from 'react';
import api from '../services/APIService';
import { BunchOfArticles } from '../types';
import {
  APPEND_ARTICLES,
  APPEND_ARTICLES_ERROR,
  APPEND_ARTICLES_LOADING,
  SET_CURRENT_PAGE,
  SET_CURRENT_TAG,
  VIEW_ARTICLE_ID,
} from './constants';


// Actions Interfaces
export interface IArticlesLoading {
  type: typeof APPEND_ARTICLES_LOADING,
  flag: Boolean,
}

export interface IArticlesError {
  type: typeof APPEND_ARTICLES_ERROR,
  error: string,
}

export interface IArticlesSuccess {
  type: typeof APPEND_ARTICLES,
  data: BunchOfArticles, 
}

interface IArticleView {
  type: typeof VIEW_ARTICLE_ID,
  id: string,
}

export interface IPageNum {
  type: typeof SET_CURRENT_PAGE,
  page: number,
}

interface IArticlesTag {
  type: typeof SET_CURRENT_TAG,
  tag: string | null,
}

export type ArticlesActionTypes = IArticlesLoading  | IArticlesError | IArticlesSuccess | IPageNum;

// Action Creators
export const setArticlesLoading = (flag: Boolean): ArticlesActionTypes => ({ 
  type: APPEND_ARTICLES_LOADING, 
  flag
});

export const setArticlesError = (msg: string): ArticlesActionTypes => ({ 
  type: APPEND_ARTICLES_ERROR, 
  error: msg,
});

export const setArticlesSuccess = (data: BunchOfArticles): ArticlesActionTypes => ({
  type: APPEND_ARTICLES,
  data
});

export const viewArticle = (id: string): IArticleView => ({
  type: VIEW_ARTICLE_ID,
  id,
})

export const setCurrentPage = (num: number): IPageNum => ({ 
  type: SET_CURRENT_PAGE, 
  page: num,
});

export const setCurrentTag = (tag: string | null): IArticlesTag => ({ 
  type: SET_CURRENT_TAG, 
  tag,
});


async function loadMoreArticles(
  service: typeof api, 
  dispatch: Dispatch<ArticlesActionTypes>, 
  page: number = 1
) {

  dispatch(setArticlesLoading(true));
  try {
    const data: BunchOfArticles = await service.getArticles(page);
    dispatch(setArticlesSuccess(data));
  } catch (err) {
    dispatch(setArticlesError(err.message));
  }

}

export function asyncMoreArticles(page: number = 1) {
  return (dispatch: Dispatch<ArticlesActionTypes>) => {
    loadMoreArticles(api, dispatch, page);
  };
}

