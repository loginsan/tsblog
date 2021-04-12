import { Dispatch } from 'react';
import api from '../services/APIService';
import { ArticlesResponse, ArticleResponse, UserResponse } from '../types';
import {
  APPEND_ARTICLES,
  APPEND_ARTICLES_ERROR,
  APPEND_ARTICLES_LOADING,
  SET_CURRENT_PAGE,
  SET_CURRENT_TAG,
  VIEW_ARTICLE,
  VIEW_ARTICLE_LOADING,
  VIEW_ARTICLE_ERROR,
  LOGIN_USER_LOADING,
  LOGIN_USER_ERROR,
  LOGIN_USER,
} from './constants';


// Actions Interfaces
export interface ArticlesLoading {
  type: typeof APPEND_ARTICLES_LOADING,
  flag: boolean,
}

export interface ArticlesError {
  type: typeof APPEND_ARTICLES_ERROR,
  error: string,
}

export interface ArticlesSuccess {
  type: typeof APPEND_ARTICLES,
  data: ArticlesResponse, 
}

export interface PageNum {
  type: typeof SET_CURRENT_PAGE,
  page: number,
}

export interface ArticleView {
  type: typeof VIEW_ARTICLE,
  data: ArticleResponse,
}

export interface ArticleLoading {
  type: typeof VIEW_ARTICLE_LOADING,
  flag: boolean,
}

export interface ArticleError {
  type: typeof VIEW_ARTICLE_ERROR,
  error: string,
}

interface ArticleTag {
  type: typeof SET_CURRENT_TAG,
  tag: string | null,
}

export interface LoginLoading {
  type: typeof LOGIN_USER_LOADING,
  flag: boolean,
}

export interface LoginError {
  type: typeof LOGIN_USER_ERROR,
  error: string,
}

export interface LoginSuccess {
  type: typeof LOGIN_USER,
  data: UserResponse,
}


export type ArticlesAction = ArticlesLoading|ArticlesError|
  ArticlesSuccess|PageNum;
export type ArticleAction = ArticleLoading  | ArticleError | ArticleView;
export type AuthAction = LoginLoading | LoginError | LoginSuccess;


// Action Creators
export const setArticlesLoading = (flag: boolean): ArticlesAction => ({ 
  type: APPEND_ARTICLES_LOADING, 
  flag
});

export const setArticlesError = (msg: string): ArticlesAction => ({ 
  type: APPEND_ARTICLES_ERROR, 
  error: msg,
});

export const setArticles = (data: ArticlesResponse): ArticlesAction => ({
  type: APPEND_ARTICLES,
  data,
});

export const viewArticleLoading = (flag: boolean): ArticleAction => ({ 
  type: VIEW_ARTICLE_LOADING, 
  flag
});

export const viewArticleError = (msg: string): ArticleAction => ({ 
  type: VIEW_ARTICLE_ERROR, 
  error: msg,
});

export const viewArticle = (data: ArticleResponse): ArticleAction => ({
  type: VIEW_ARTICLE,
  data,
});


export const loginUserLoading = (flag: boolean): AuthAction => ({ 
  type: LOGIN_USER_LOADING, 
  flag
});

export const loginUserError = (msg: string): AuthAction => ({ 
  type: LOGIN_USER_ERROR, 
  error: msg,
});

export const loginUser = (data: UserResponse): AuthAction => ({
  type: LOGIN_USER,
  data,
});


export const setCurrentPage = (num: number): PageNum => ({ 
  type: SET_CURRENT_PAGE, 
  page: num,
});

export const setCurrentTag = (tag: string | null): ArticleTag => ({ 
  type: SET_CURRENT_TAG, 
  tag,
});

// ASYNC ACTIONS

async function fetchArticles(
  service: typeof api, 
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
  service: typeof api, 
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


async function fetchAuth(
  service: typeof api, 
  dispatch: Dispatch<AuthAction>, 
  email: string,
  pass: string
) {

  dispatch( loginUserLoading(true) );
  try {
    const data: UserResponse = await service.authRequest(email, pass);
    dispatch( loginUser(data) );
  } catch (err) {
    dispatch( loginUserError(err.message) );
  }
}

export function asyncGetAuth(email: string, pass: string) {
  return (dispatch: Dispatch<AuthAction>) => {
    fetchAuth(api, dispatch, email, pass);
  };
}