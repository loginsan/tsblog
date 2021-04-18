import { Dispatch } from 'react';
import api from '../services/APIService';
import {
  UserData, 
  User,
} from '../types';
import {
  FETCH_USER_LOADING,
  FETCH_USER_ERROR,
  LOGIN_USER,
  LOGOUT_USER,
  UPDATE_USER,
  REGISTER_USER,
  GET_CURRENT_USER,
} from './constants';

type Api = typeof api;


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
  data: UserData,
}

export interface LogoutSuccess {
  type: typeof LOGOUT_USER,
}

export interface UpdateUserSuccess {
  type: typeof UPDATE_USER,
  data: UserData,
}

export interface RegisterSuccess {
  type: typeof REGISTER_USER,
  data: UserData,
}

export interface GetCurrentUser {
  type: typeof GET_CURRENT_USER
  data: UserData
}


export type UserAction = LoginLoading|LoginError|LoginSuccess|
  LogoutSuccess|UpdateUserSuccess|RegisterSuccess|GetCurrentUser;


export const fetchUserLoading = (flag: boolean): UserAction => ({ 
  type: FETCH_USER_LOADING, 
  flag,
});

export const fetchUserError = (msg: string): UserAction => ({ 
  type: FETCH_USER_ERROR, 
  error: msg,
});


export const loginUser = (data: UserData): UserAction => ({
  type: LOGIN_USER,
  data,
});

async function fetchAuth(
  service: Api, 
  dispatch: Dispatch<UserAction>, 
  email: string,
  pass: string
) {
  dispatch( fetchUserLoading(true) );
  try {
    const data: UserData = await service.authUserRequest(email, pass);
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


export const logoutUser = (): UserAction => ({
  type: LOGOUT_USER,
});


export const updateUser = (data: UserData): UserAction => ({
  type: UPDATE_USER,
  data,
});

async function fetchUpdateUser(
  service: Api, 
  dispatch: Dispatch<UserAction>,
  token: string,
  user: User
) {
  dispatch( fetchUserLoading(true) );
  try {
    const data: UserData = await service.updateUserRequest(token, user);
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
  data,
});

async function fetchRegisterUser(
  service: Api, 
  dispatch: Dispatch<UserAction>,
  user: User
) {
  dispatch( fetchUserLoading(true) );
  try {
    const data: UserData = await service.registerUserRequest(user);
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
  data,
});

async function fetchCurrentUser(
  service: Api, 
  dispatch: Dispatch<UserAction>,
  token: string
) {
  dispatch( fetchUserLoading(true) );
  try {
    const data: UserData = await service.getUserRequest(token);
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
