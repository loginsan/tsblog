import { Dispatch } from 'react';
import api from '../services/APIService';
import { 
  ArticlesResponse, 
  ArticleResponse,
} from '../types';
import {
  LOAD_ARTICLES,
  LOAD_ARTICLES_ERROR,
  LOAD_ARTICLES_LOADING,
  SET_CURRENT_PAGE,
  SET_CURRENT_TAG,
  VIEW_ARTICLE,
  VIEW_ARTICLE_LOADING,
  VIEW_ARTICLE_ERROR,
} from './constants';

type Api = typeof api;


// Actions Interfaces
export interface ArticlesLoading {
  type: typeof LOAD_ARTICLES_LOADING,
  payload: boolean,
}

export interface ArticlesError {
  type: typeof LOAD_ARTICLES_ERROR,
  payload: string,
}

export interface ArticlesSuccess {
  type: typeof LOAD_ARTICLES,
  payload: ArticlesResponse, 
}

export interface PageNum {
  type: typeof SET_CURRENT_PAGE,
  payload: number,
}

export interface ArticleView {
  type: typeof VIEW_ARTICLE,
  payload: ArticleResponse,
}

export interface ArticleLoading {
  type: typeof VIEW_ARTICLE_LOADING,
  payload: boolean,
}

export interface ArticleError {
  type: typeof VIEW_ARTICLE_ERROR,
  payload: string,
}

interface ArticleTag {
  type: typeof SET_CURRENT_TAG,
  payload: string | null,
}

// export type ArticlesAction = ArticlesLoading|ArticlesError|
//   ArticlesSuccess|PageNum;
export type ArticlesAction = {
  type: string,
  payload: boolean | string | number | ArticlesResponse;
};
// export type ArticleAction = ArticleLoading|ArticleError|ArticleView;
export type ArticleAction = {
  type: string,
  payload: boolean | string | ArticleResponse;
};


// Action Creators
export const setArticlesLoading = (flag: boolean): ArticlesAction => ({ 
  type: LOAD_ARTICLES_LOADING, 
  payload: flag,
});

export const setArticlesError = (msg: string): ArticlesAction => ({ 
  type: LOAD_ARTICLES_ERROR, 
  payload: msg,
});

export const setArticles = (data: ArticlesResponse): ArticlesAction => ({
  type: LOAD_ARTICLES,
  payload: data,
});

export const viewArticleLoading = (flag: boolean): ArticleAction => ({ 
  type: VIEW_ARTICLE_LOADING, 
  payload: flag,
});

export const viewArticleError = (msg: string): ArticleAction => ({ 
  type: VIEW_ARTICLE_ERROR, 
  payload: msg,
});

export const viewArticle = (data: ArticleResponse): ArticleAction => ({
  type: VIEW_ARTICLE,
  payload: data,
});

export const setCurrentPage = (num: number): PageNum => ({ 
  type: SET_CURRENT_PAGE, 
  payload: num,
});

export const setCurrentTag = (tag: string | null): ArticleTag => ({ 
  type: SET_CURRENT_TAG, 
  payload: tag,
});


// ASYNC ACTIONS

async function fetchArticles(
  service: Api, 
  dispatch: Dispatch<ArticlesAction>, 
  page: number = 1
) {

  dispatch( setArticlesLoading(true) );
  try {
    const data: ArticlesResponse = await service.getArticles(page);
    dispatch( setArticles(data) );
  } catch (err) {
    dispatch( setArticlesError(err.message) );
  }
}

export function asyncGetArticles(page: number = 1) {
  return (dispatch: Dispatch<ArticlesAction>) => {
    fetchArticles(api, dispatch, page);
  };
}


async function fetchArticle(
  service: Api, 
  dispatch: Dispatch<ArticleAction>, 
  id: string
) {

  dispatch( viewArticleLoading(true) );
  try {
    const data: ArticleResponse = await service.getArticle(id);
    dispatch( viewArticle(data) );
  } catch (err) {
    dispatch( viewArticleError(err.message) );
  }
}

export function asyncGetArticle(id: string) {
  return (dispatch: Dispatch<ArticleAction>) => {
    fetchArticle(api, dispatch, id);
  };
}
