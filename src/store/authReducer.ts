import { User } from '../types';
import { 
  AuthAction, 
  LoginLoading, 
  LoginError, 
  LoginSuccess, 
} from './actions';
import {
  LOGIN_USER_LOADING,
  LOGIN_USER_ERROR,
  LOGIN_USER,
} from './constants';


export interface AuthState {
  loading: boolean,
  error: string,
  user: User,
}

const initialState: AuthState = {
  loading: true,
  error: '',
  user: {},
};

export default function auth(
  state = initialState, 
  action: AuthAction
): AuthState {

  switch (action.type) {
    case LOGIN_USER_LOADING:
      return { 
        ...state,
        error: '',
        loading: (action as LoginLoading).flag
      };
    
    case LOGIN_USER_ERROR:
      return { 
        ...state, 
        error: (action as LoginError).error,
        loading: false,
      };
    
    case LOGIN_USER:
      return { 
        ...state, 
        loading: false,
        user: (action as LoginSuccess).data.user,
      };

    default:
      return state;
  }
};
