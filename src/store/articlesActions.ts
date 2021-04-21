import { Dispatch } from 'react';
import api from '../services/APIService';
import { 
  ArticlesData, 
  ArticleData,
  CommentsData,
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
  FETCH_COMMENTS_LOADING,
  FETCH_COMMENTS_ERROR,
  FETCH_COMMENTS,
  FAVORITE_ARTICLE_FETCHING,
  FAVORITE_ARTICLE_ERROR,
  FAVORITE_ARTICLE,
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
  payload: ArticlesData, 
}

export interface PageNum {
  type: typeof SET_CURRENT_PAGE,
  payload: number,
}

export interface ArticleView {
  type: typeof VIEW_ARTICLE,
  payload: ArticleData,
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

export interface CommentsView {
  type: typeof FETCH_COMMENTS,
  payload: CommentsData,
}

export interface CommentsLoading {
  type: typeof FETCH_COMMENTS_LOADING,
  payload: boolean,
}

export interface CommentsError {
  type: typeof FETCH_COMMENTS_ERROR,
  payload: string,
}

export interface FavoriteFetching {
  type: typeof FAVORITE_ARTICLE_FETCHING,
  payload: boolean,
}

export interface FavoriteError {
  type: typeof FAVORITE_ARTICLE_ERROR,
  payload: string,
}

export interface FavoriteUpdate {
  type: typeof FAVORITE_ARTICLE,
  payload: ArticleData,
}


// export type ArticlesAction = ArticlesLoading|ArticlesError|
//   ArticlesSuccess|PageNum;
export type ArticlesAction = {
  type: string,
  payload: boolean | string | number | ArticlesData | ArticleData;
};
// export type ArticleAction = ArticleLoading|ArticleError|ArticleView;
export type ArticleAction = {
  type: string,
  payload: boolean | string | ArticleData | CommentsData;
};


// Action Creators
export const articlesListLoading = (flag: boolean): ArticlesAction => ({ 
  type: LOAD_ARTICLES_LOADING, 
  payload: flag,
});

export const articlesListError = (msg: string): ArticlesAction => ({ 
  type: LOAD_ARTICLES_ERROR, 
  payload: msg,
});

export const articlesListSuccess = (data: ArticlesData): ArticlesAction => ({
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

export const viewArticle = (data: ArticleData): ArticleAction => ({
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

export const commentsLoading = (flag: boolean): ArticleAction => ({ 
  type: FETCH_COMMENTS_LOADING, 
  payload: flag,
});

export const commentsError = (msg: string): ArticleAction => ({ 
  type: FETCH_COMMENTS_ERROR, 
  payload: msg,
});

export const commentsSuccess = (data: CommentsData): ArticleAction => ({
  type: FETCH_COMMENTS,
  payload: data,
});

export const favoriteFetching = (flag: boolean): ArticleAction => ({
  type: FAVORITE_ARTICLE_FETCHING,
  payload: flag,
});

export const favoriteError = (msg: string): ArticleAction => ({
  type: FAVORITE_ARTICLE_ERROR,
  payload: msg,
});

export const favoriteUpdate = (data: ArticleData): ArticleAction => ({
  type: FAVORITE_ARTICLE,
  payload: data,
});



// ASYNC ACTIONS

async function fetchArticles(
  service: Api, 
  dispatch: Dispatch<ArticlesAction>, 
  page: number = 1,
  token: string
) {

  dispatch( articlesListLoading(true) );
  try {
    const data: ArticlesData = await service.getArticles(page, token);
    dispatch( articlesListSuccess(data) );
  } catch (err) {
    dispatch( articlesListError(err.message) );
  }
}

export function asyncGetArticles(page: number = 1, token: string) {
  return (dispatch: Dispatch<ArticlesAction>) => {
    fetchArticles(api, dispatch, page, token);
  };
}


async function fetchArticle(
  service: Api, 
  dispatch: Dispatch<ArticleAction>, 
  id: string,
  token: string
) {

  dispatch( viewArticleLoading(true) );
  try {
    const data: ArticleData = await service.getArticle(id, token);
    dispatch( viewArticle(data) );
  } catch (err) {
    dispatch( viewArticleError(err.message) );
  }
}

export function asyncGetArticle(id: string, token: string) {
  return (dispatch: Dispatch<ArticleAction>) => {
    fetchArticle(api, dispatch, id, token);
  };
}


async function fetchComments(
  service: Api, 
  dispatch: Dispatch<ArticleAction>,
  slug: string,
  token: string
) {

  dispatch( commentsLoading(true) );
  try {
    const data: CommentsData = await service.getComments(slug, token);
    dispatch( commentsSuccess(data) );
  } catch (err) {
    dispatch( commentsError(err.message) );
  }
}

export function asyncGetComments(slug: string, token: string) {
  return (dispatch: Dispatch<ArticleAction>) => {
    fetchComments(api, dispatch, slug, token);
  };
}


async function fetchFavorite(
  service: Api, 
  dispatch: Dispatch<ArticleAction>,
  slug: string,
  flag: boolean,
  token: string
) {

  dispatch( favoriteFetching(true) );
  try {
    const data: ArticleData = await service.setFavorite(slug, flag, token);
    dispatch( favoriteUpdate(data) );
  } catch (err) {
    dispatch( favoriteError(err.message) );
  }
}

export function asyncSetFavorite(slug: string, flag: boolean, token: string) {
  return (dispatch: Dispatch<ArticleAction>) => {
    fetchFavorite(api, dispatch, slug, flag, token);
  };
}


