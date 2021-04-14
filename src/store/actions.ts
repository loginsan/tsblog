import { Dispatch } from 'react';
import api from '../services/APIService';
import { ArticlesResponse, ArticleResponse, UserResponse, User } from '../types';
import {
  APPEND_ARTICLES,
  APPEND_ARTICLES_ERROR,
  APPEND_ARTICLES_LOADING,
  SET_CURRENT_PAGE,
  SET_CURRENT_TAG,
  VIEW_ARTICLE,
  VIEW_ARTICLE_LOADING,
  VIEW_ARTICLE_ERROR,
  FETCH_USER_LOADING,
  FETCH_USER_ERROR,
  LOGIN_USER,
  LOGOUT_USER,
  UPDATE_USER,
  REGISTER_USER,
} from './constants';

type Api = typeof api;


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
  type: typeof FETCH_USER_LOADING,
  flag: boolean,
}

export interface LoginError {
  type: typeof FETCH_USER_ERROR,
  error: string,
}

export interface LoginSuccess {
  type: typeof LOGIN_USER,
  data: UserResponse,
}

export interface LogoutSuccess {
  type: typeof LOGOUT_USER,
}

export interface UpdateUserSuccess {
  type: typeof UPDATE_USER,
  data: UserResponse,
}

export interface RegisterSuccess {
  type: typeof REGISTER_USER,
  data: UserResponse,
}




export type ArticlesAction = ArticlesLoading|ArticlesError|
  ArticlesSuccess|PageNum;
export type ArticleAction = ArticleLoading|ArticleError|ArticleView;
export type UserAction = LoginLoading|LoginError|LoginSuccess|
  LogoutSuccess|UpdateUserSuccess|RegisterSuccess;
// export type UserAction = UpdateUserLoading|UpdateUserError|UpdateUserSuccess;


// Action Creators
export const setArticlesLoading = (flag: boolean): ArticlesAction => ({ 
  type: APPEND_ARTICLES_LOADING, 
  flag,
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
  flag,
});

export const viewArticleError = (msg: string): ArticleAction => ({ 
  type: VIEW_ARTICLE_ERROR, 
  error: msg,
});

export const viewArticle = (data: ArticleResponse): ArticleAction => ({
  type: VIEW_ARTICLE,
  data,
});


export const fetchUserLoading = (flag: boolean): UserAction => ({ 
  type: FETCH_USER_LOADING, 
  flag,
});

export const fetchUserError = (msg: string): UserAction => ({ 
  type: FETCH_USER_ERROR, 
  error: msg,
});

export const loginUser = (data: UserResponse): UserAction => ({
  type: LOGIN_USER,
  data,
});

export const logoutUser = (): UserAction => ({
  type: LOGOUT_USER,
});


export const setCurrentPage = (num: number): PageNum => ({ 
  type: SET_CURRENT_PAGE, 
  page: num,
});

export const setCurrentTag = (tag: string | null): ArticleTag => ({ 
  type: SET_CURRENT_TAG, 
  tag,
});

export const updateUser = (data: UserResponse): UserAction => ({
  type: UPDATE_USER,
  data,
});

export const registerUser = (data: UserResponse): UserAction => ({
  type: REGISTER_USER,
  data,
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


async function fetchAuth(
  service: Api, 
  dispatch: Dispatch<UserAction>, 
  email: string,
  pass: string
) {

  dispatch( fetchUserLoading(true) );
  try {
    const data: UserResponse = await service.authRequest(email, pass);
    dispatch( loginUser(data) );
  } catch (err) {
    dispatch( fetchUserError(err.message) );
  }
}

export function asyncGetAuth(email: string, pass: string) {
  return (dispatch: Dispatch<UserAction>) => {
    fetchAuth(api, dispatch, email, pass);
  };
}


async function fetchUpdateUser(
  service: Api, 
  dispatch: Dispatch<UserAction>,
  token: string,
  user: User
) {
  dispatch( fetchUserLoading(true) );
  try {
    const data: UserResponse = await service.updateRequest(token, user);
    dispatch( updateUser(data) );
  } catch (err) {
    dispatch( fetchUserError(err.message) );
  }
}

export function asyncUpdateProfile(token: string, user: User) {
  return (dispatch: Dispatch<UserAction>) => {
    fetchUpdateUser(api, dispatch, token, user);
  }
}


async function fetchRegisterUser(
  service: Api, 
  dispatch: Dispatch<UserAction>,
  user: User
) {
  dispatch( fetchUserLoading(true) );
  try {
    const data: UserResponse = await service.registerRequest(user);
    dispatch( registerUser(data) );
  } catch (err) {
    dispatch( fetchUserError(err.message) );
  }
}

export function asyncRegister(user: User) {
  return (dispatch: Dispatch<UserAction>) => {
    fetchRegisterUser(api, dispatch, user);
  }
}