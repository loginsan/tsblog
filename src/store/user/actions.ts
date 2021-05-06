import { Dispatch } from 'react';
import api from '../../services/APIService';
import {
  FETCH_USER_LOADING,
  FETCH_USER_ERROR,
  LOGIN_USER,
  LOGOUT_USER,
  UPDATE_USER,
  REGISTER_USER,
  GET_CURRENT_USER,
} from '../constants';
import { UserData, User, UserAction } from './types';

type Api = typeof api;


export const fetchUserLoading = (flag: boolean): UserAction => ({ 
  type: FETCH_USER_LOADING, 
  payload: flag,
}) as const;

export const fetchUserError = (msg: string): UserAction => ({ 
  type: FETCH_USER_ERROR, 
  payload: msg,
}) as const;


export const loginUser = (data: UserData): UserAction => ({
  type: LOGIN_USER,
  payload: data,
}) as const;

async function fetchAuth(
  service: Api, 
  dispatch: Dispatch<UserAction>, 
  email: string,
  pass: string
) {
  dispatch( fetchUserLoading(true) );
  try {
    const data: UserData = await service.authUser(email, pass);
    dispatch( loginUser(data) );
  } catch (err) {
    dispatch( fetchUserError(err.message) );
  }
}

export function asyncGetAuth(email: string, pass: string) {
  return (dispatch: Dispatch<UserAction>) => {
    fetchAuth(api, dispatch, email, pass);
  }
}


export const logoutUser = (): UserAction => ({
  type: LOGOUT_USER,
  payload: true,
}) as const;


export const updateUser = (data: UserData): UserAction => ({
  type: UPDATE_USER,
  payload: data,
}) as const;

async function fetchUpdateUser(
  service: Api, 
  dispatch: Dispatch<UserAction>,
  token: string,
  user: User
) {
  dispatch( fetchUserLoading(true) );
  try {
    const data: UserData = await service.updateUser(token, user);
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


export const registerUser = (data: UserData): UserAction => ({
  type: REGISTER_USER,
  payload: data,
}) as const;

async function fetchRegisterUser(
  service: Api, 
  dispatch: Dispatch<UserAction>,
  user: User
) {
  dispatch( fetchUserLoading(true) );
  try {
    const data: UserData = await service.registerUser(user);
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


export const getCurrentUser = (data: UserData): UserAction => ({
  type: GET_CURRENT_USER,
  payload: data,
}) as const;

async function fetchCurrentUser(
  service: Api, 
  dispatch: Dispatch<UserAction>,
  token: string
) {
  dispatch( fetchUserLoading(true) );
  try {
    const data: UserData = await service.getUser(token);
    dispatch( getCurrentUser(data) );
  } catch (err) {
    dispatch( fetchUserError(err.message) );
  }
}

export function asyncCurrentUser(token: string) {
  return (dispatch: Dispatch<UserAction>) => {
    fetchCurrentUser(api, dispatch, token);
  }
}
