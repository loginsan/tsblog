import { Dispatch } from 'react';
import api from '../../services/APIService';
import {
  FETCH_PROFILE_LOADING,
  FETCH_PROFILE_ERROR,
  FETCH_PROFILE,
  FETCH_AUTHOR_LIST_LOADING,
  FETCH_AUTHOR_LIST_ERROR,
  FETCH_AUTHOR_LIST,
} from '../constants';
import { ProfileData, ArticlesData, ProfileAction } from './types';

type Api = typeof api;


export const fetchProfileLoading = (flag: boolean): ProfileAction => ({ 
  type: FETCH_PROFILE_LOADING, 
  payload: flag,
}) as const;

export const fetchProfileError = (msg: string): ProfileAction => ({ 
  type: FETCH_PROFILE_ERROR, 
  payload: msg,
}) as const;

export const fetchProfile = (data: ProfileData): ProfileAction => ({
  type: FETCH_PROFILE,
  payload: data,
}) as const;

export const fetchAuthorListLoading = (flag: boolean): ProfileAction => ({ 
  type: FETCH_AUTHOR_LIST_LOADING, 
  payload: flag,
}) as const;

export const fetchAuthorListError = (msg: string): ProfileAction => ({ 
  type: FETCH_AUTHOR_LIST_ERROR, 
  payload: msg,
}) as const;

export const fetchAuthorList = (data: ArticlesData): ProfileAction => ({
  type: FETCH_AUTHOR_LIST,
  payload: data,
}) as const;

async function fetchAuthorProfile(
  service: Api, 
  dispatch: Dispatch<ProfileAction>, 
  username: string,
  token: string
) {
  dispatch( fetchProfileLoading(true) );
  try {
    const data: ProfileData = await service.getProfile(username, token);
    dispatch( fetchProfile(data) );
  } catch (err) {
    dispatch( fetchProfileError(err.message) );
  }
}

export function asyncGetProfile(username: string, token: string) {
  return (dispatch: Dispatch<ProfileAction>) => {
    fetchAuthorProfile(api, dispatch, username, token);
  }
}

async function fetchAuthorArticles(
  service: Api, 
  dispatch: Dispatch<ProfileAction>, 
  author: string,
  token: string
) {

  dispatch( fetchAuthorListLoading(true) );
  try {
    const data: ArticlesData = await service.getAuthorArticles(author, token);
    dispatch( fetchAuthorList(data) );
  } catch (err) {
    dispatch( fetchAuthorListError(err.message) );
  }
}

export function asyncGetAuthorArticles(author: string, token: string) {
  return (dispatch: Dispatch<ProfileAction>) => {
    fetchAuthorArticles(api, dispatch, author, token);
  }
}
