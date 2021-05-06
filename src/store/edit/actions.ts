import { Dispatch } from 'react';
import api from '../../services/APIService';
import {
  EDIT_ARTICLE_FETCHING,
  EDIT_ARTICLE_ERROR,
  EDIT_ARTICLE_SUCCESS,
  INIT_TAGS,
  ADD_TAG,
  EDIT_TAG,
  REMOVE_TAG,
  CLEAR_EDIT,
} from '../constants';
import { ArticleData, Tag, ArticleCore, PostArticle } from './types';
import { ArticleAction } from '../single/types';

type Api = typeof api;


export const editArticleFetching = (flag: boolean): ArticleAction => ({
  type: EDIT_ARTICLE_FETCHING,
  payload: flag,
}) as const;

export const editArticleError = (msg: string): ArticleAction => ({
  type: EDIT_ARTICLE_ERROR,
  payload: msg,
}) as const;

export const editArticleSuccess = (data: PostArticle): ArticleAction => ({
  type: EDIT_ARTICLE_SUCCESS,
  payload: data,
}) as const;

export const initTags = (tags: string[]): ArticleAction => ({
  type: INIT_TAGS,
  payload: tags,
}) as const;

export const editTag = (tag: Tag): ArticleAction => ({
  type: EDIT_TAG,
  payload: tag,
}) as const;

export const addTag = (num: number): ArticleAction => ({
  type: ADD_TAG,
  payload: num,
}) as const;

export const removeTag = (num: number): ArticleAction => ({
  type: REMOVE_TAG,
  payload: num,
}) as const;

export const clearEdit = (flag: boolean): ArticleAction => ({
  type: CLEAR_EDIT,
  payload: flag,
}) as const;


async function fetchNewArticle(
  service: Api, 
  dispatch: Dispatch<ArticleAction>, 
  article: ArticleCore,
  token: string
) {
  dispatch( editArticleFetching(true) );
  try {
    const data: ArticleData = await service.createArticle(article, token);
    dispatch( editArticleSuccess(data) );
  } catch (err) {
    dispatch( editArticleError(err.message) );
  }
}

export function asyncCreateArticle(article: ArticleCore, token: string) {
  return (dispatch: Dispatch<ArticleAction>) => {
    fetchNewArticle(api, dispatch, article, token);
  }
}


async function fetchUpdateArticle(
  service: Api, 
  dispatch: Dispatch<ArticleAction>,
  slug: string, 
  article: ArticleCore,
  token: string
) {
  dispatch( editArticleFetching(true) );
  try {
    const data: ArticleData = await service.updateArticle(slug, article, token);
    dispatch( editArticleSuccess(data) );
  } catch (err) {
    dispatch( editArticleError(err.message) );
  }
}

export function asyncUpdateArticle(
  slug: string,
  article: ArticleCore,
  token: string
) {
  return (dispatch: Dispatch<ArticleAction>) => {
    fetchUpdateArticle(api, dispatch, slug, article, token);
  }
}
