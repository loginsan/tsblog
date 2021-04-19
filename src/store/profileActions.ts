import { Dispatch } from 'react';
import api from '../services/APIService';
import { ProfileData } from '../types';
import {
  FETCH_PROFILE_LOADING,
  FETCH_PROFILE_ERROR,
  FETCH_PROFILE,
} from './constants';

type Api = typeof api;


export interface ProfileLoading {
  type: typeof FETCH_PROFILE_LOADING,
  payload: boolean,
}

export interface ProfileError {
  type: typeof FETCH_PROFILE_ERROR,
  payload: string,
}

export interface ProfileSuccess {
  type: typeof FETCH_PROFILE,
  payload: ProfileData,
}


export type ProfileAction = {
  type: string,
  payload: boolean | string | ProfileData,
}


export const fetchProfileLoading = (flag: boolean): ProfileAction => ({ 
  type: FETCH_PROFILE_LOADING, 
  payload: flag,
});

export const fetchProfileError = (msg: string): ProfileAction => ({ 
  type: FETCH_PROFILE_ERROR, 
  payload: msg,
});

export const fetchProfile = (data: ProfileData): ProfileAction => ({
  type: FETCH_PROFILE,
  payload: data,
});

async function fetchAuthorProfile(
  service: Api, 
  dispatch: Dispatch<ProfileAction>, 
  username: string
) {
  dispatch( fetchProfileLoading(true) );
  try {
    const data: ProfileData = await service.getProfileRequest(username);
    dispatch( fetchProfile(data) );
  } catch (err) {
    dispatch( fetchProfileError(err.message) );
  }
}

export function asyncGetProfile(username: string) {
  return (dispatch: Dispatch<ProfileAction>) => {
    fetchAuthorProfile(api, dispatch, username);
  };
}
