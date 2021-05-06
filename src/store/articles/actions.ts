import { Dispatch } from 'react';
import api from '../../services/APIService';
import {
  LOAD_ARTICLES,
  LOAD_ARTICLES_ERROR,
  LOAD_ARTICLES_LOADING,
  SET_CURRENT_PAGE,
} from '../constants';
import { ArticlesData, ArticlesAction, PageNum } from './types';

type Api = typeof api;


export const articlesListLoading = (flag: boolean): ArticlesAction => ({ 
  type: LOAD_ARTICLES_LOADING, 
  payload: flag,
}) as const;

export const articlesListError = (msg: string): ArticlesAction => ({ 
  type: LOAD_ARTICLES_ERROR, 
  payload: msg,
}) as const;

export const articlesListSuccess = (data: ArticlesData): ArticlesAction => ({
  type: LOAD_ARTICLES,
  payload: data,
}) as const;

export const setCurrentPage = (num: number): PageNum => ({ 
  type: SET_CURRENT_PAGE, 
  payload: num,
}) as const;

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
  }
}
