import { Dispatch } from 'react';
import api from '../services/APIService';
import { BunchOfArticles, ArticleResponse } from '../types';
import {
  APPEND_ARTICLES,
  APPEND_ARTICLES_ERROR,
  APPEND_ARTICLES_LOADING,
  SET_CURRENT_PAGE,
  SET_CURRENT_TAG,
  VIEW_ARTICLE,
  VIEW_ARTICLE_LOADING,
  VIEW_ARTICLE_ERROR,
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

export interface IPageNum {
  type: typeof SET_CURRENT_PAGE,
  page: number,
}

export interface IArticleView {
  type: typeof VIEW_ARTICLE,
  data: ArticleResponse,
}

export interface IArticleLoading {
  type: typeof VIEW_ARTICLE_LOADING,
  flag: Boolean,
}

export interface IArticleError {
  type: typeof VIEW_ARTICLE_ERROR,
  error: string,
}

interface IArticlesTag {
  type: typeof SET_CURRENT_TAG,
  tag: string | null,
}

export type ArticlesActionTypes = IArticlesLoading  | 
  IArticlesError | IArticlesSuccess | IPageNum;
export type ArticleActionType = IArticleLoading  | IArticleError | IArticleView;


// Action Creators
export const setArticlesLoading = (flag: Boolean): ArticlesActionTypes => ({ 
  type: APPEND_ARTICLES_LOADING, 
  flag
});

export const setArticlesError = (msg: string): ArticlesActionTypes => ({ 
  type: APPEND_ARTICLES_ERROR, 
  error: msg,
});

export const setArticles = (data: BunchOfArticles): ArticlesActionTypes => ({
  type: APPEND_ARTICLES,
  data,
});


export const viewArticle = (data: ArticleResponse): ArticleActionType => ({
  type: VIEW_ARTICLE,
  data,
});

export const viewArticleLoading = (flag: Boolean): ArticleActionType => ({ 
  type: VIEW_ARTICLE_LOADING, 
  flag
});

export const viewArticleError = (msg: string): ArticleActionType => ({ 
  type: VIEW_ARTICLE_ERROR, 
  error: msg,
});

export const setCurrentPage = (num: number): IPageNum => ({ 
  type: SET_CURRENT_PAGE, 
  page: num,
});

export const setCurrentTag = (tag: string | null): IArticlesTag => ({ 
  type: SET_CURRENT_TAG, 
  tag,
});

// ASYNC ACTIONS

async function loadMoreArticles(
  service: typeof api, 
  dispatch: Dispatch<ArticlesActionTypes>, 
  page: number = 1
) {

  dispatch(setArticlesLoading(true));
  try {
    const data: BunchOfArticles = await service.getArticles(page);
    dispatch(setArticles(data));
  } catch (err) {
    dispatch(setArticlesError(err.message));
  }
}

export function asyncMoreArticles(page: number = 1) {
  return (dispatch: Dispatch<ArticlesActionTypes>) => {
    loadMoreArticles(api, dispatch, page);
  };
}


async function loadArticle(
  service: typeof api, 
  dispatch: Dispatch<ArticleActionType>, 
  id: string
) {

  dispatch(viewArticleLoading(true));
  try {
    const data: ArticleResponse = await service.getArticle(id);
    dispatch(viewArticle(data));
  } catch (err) {
    dispatch(viewArticleError(err.message));
  }
}

export function asyncViewArticle(id: string) {
  return (dispatch: Dispatch<ArticleActionType>) => {
    loadArticle(api, dispatch, id);
  };
}

