import { Dispatch } from 'react';
import api from '../../services/APIService';
import {
  VIEW_ARTICLE,
  VIEW_ARTICLE_LOADING,
  VIEW_ARTICLE_ERROR,
  FETCH_COMMENTS_LOADING,
  FETCH_COMMENTS_ERROR,
  FETCH_COMMENTS,
  FAVORITE_ARTICLE_FETCHING,
  FAVORITE_ARTICLE_ERROR,
  FAVORITE_ARTICLE,
  DELETE_ARTICLE,
} from '../constants';
import { ArticleData, CommentsData, ArticleAction } from './types';

type Api = typeof api;


export const viewArticleLoading = (flag: boolean): ArticleAction => ({ 
  type: VIEW_ARTICLE_LOADING, 
  payload: flag,
}) as const;

export const viewArticleError = (msg: string): ArticleAction => ({ 
  type: VIEW_ARTICLE_ERROR, 
  payload: msg,
}) as const;

export const viewArticle = (data: ArticleData): ArticleAction => ({
  type: VIEW_ARTICLE,
  payload: data,
}) as const;

export const commentsLoading = (flag: boolean): ArticleAction => ({ 
  type: FETCH_COMMENTS_LOADING, 
  payload: flag,
}) as const;

export const commentsError = (msg: string): ArticleAction => ({ 
  type: FETCH_COMMENTS_ERROR, 
  payload: msg,
}) as const;

export const commentsSuccess = (data: CommentsData): ArticleAction => ({
  type: FETCH_COMMENTS,
  payload: data,
}) as const;

export const favoriteFetching = (flag: boolean): ArticleAction => ({
  type: FAVORITE_ARTICLE_FETCHING,
  payload: flag,
}) as const;

export const favoriteError = (msg: string): ArticleAction => ({
  type: FAVORITE_ARTICLE_ERROR,
  payload: msg,
}) as const;

export const favoriteUpdate = (data: ArticleData): ArticleAction => ({
  type: FAVORITE_ARTICLE,
  payload: data,
}) as const;

export const deleteArticle = (data: ArticleData): ArticleAction => ({
  type: DELETE_ARTICLE,
  payload: data,
}) as const;


async function fetchArticle(
  service: Api, 
  dispatch: Dispatch<ArticleAction>, 
  slug: string,
  token: string
) {
  dispatch( viewArticleLoading(true) );
  try {
    const data: ArticleData = await service.getArticle(slug, token);
    dispatch( viewArticle(data) );
  } catch (err) {
    dispatch( viewArticleError(err.message) );
  }
}

export function asyncGetArticle(slug: string, token: string) {
  return (dispatch: Dispatch<ArticleAction>) => {
    fetchArticle(api, dispatch, slug, token);
  }
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
  }
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
  }
}


async function fetchDeleteArticle(
  service: Api, 
  dispatch: Dispatch<ArticleAction>,
  slug: string,
  token: string
) {
  dispatch( viewArticleLoading(true) );
  try {
    const data: ArticleData = await service.deleteArticle(slug, token);
    dispatch( deleteArticle(data) );
  } catch (err) {
    dispatch( viewArticleError(err.message) );
  }
}

export function asyncDeleteArticle(slug: string, token: string) {
  return (dispatch: Dispatch<ArticleAction>) => {
    fetchDeleteArticle(api, dispatch, slug, token);
  }
}
