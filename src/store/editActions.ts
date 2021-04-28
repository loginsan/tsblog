import { Dispatch } from 'react';
import api from '../services/APIService';
import { Article, ArticleData, Tag } from '../types';
import { ArticleAction } from './articlesActions';
import {
  EDIT_ARTICLE_FETCHING,
  EDIT_ARTICLE_ERROR,
  EDIT_ARTICLE_SUCCESS,
  INIT_TAGS,
  ADD_TAG,
  EDIT_TAG,
  REMOVE_TAG,
} from './constants';

type Api = typeof api;

export const editArticleFetching = (flag: boolean): ArticleAction => ({
  type: EDIT_ARTICLE_FETCHING,
  payload: flag,
});

export const editArticleError = (msg: string): ArticleAction => ({
  type: EDIT_ARTICLE_ERROR,
  payload: msg,
});

export const editArticleSuccess = (data: ArticleData): ArticleAction => ({
  type: EDIT_ARTICLE_SUCCESS,
  payload: data,
});

export const initTags = (tags: string[]): ArticleAction => ({
  type: INIT_TAGS,
  payload: tags,
});

export const editTag = (tag: Tag): ArticleAction => ({
  type: EDIT_TAG,
  payload: tag,
});

export const addTag = (num: number): ArticleAction => ({
  type: ADD_TAG,
  payload: num,
});

export const removeTag = (num: number): ArticleAction => ({
  type: REMOVE_TAG,
  payload: num,
});


async function fetchNewArticle(
  service: Api, 
  dispatch: Dispatch<ArticleAction>, 
  article: Article,
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

export function asyncCreateArticle(article: Article, token: string) {
  return (dispatch: Dispatch<ArticleAction>) => {
    fetchNewArticle(api, dispatch, article, token);
  };
}


async function fetchUpdateArticle(
  service: Api, 
  dispatch: Dispatch<ArticleAction>,
  slug: string, 
  article: Article,
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
  article: Article,
  token: string
) {
  return (dispatch: Dispatch<ArticleAction>) => {
    fetchUpdateArticle(api, dispatch, slug, article, token);
  };
}
