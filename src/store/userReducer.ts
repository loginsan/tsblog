import { User } from '../types';
import { 
  UserAction, 
  LoginLoading, 
  LoginError, 
  LoginSuccess, 
  UpdateUserSuccess,
  RegisterSuccess,
  GetCurrentUser,
} from './userActions';
import {
  FETCH_USER_LOADING,
  FETCH_USER_ERROR,
  LOGIN_USER,
  LOGOUT_USER,
  UPDATE_USER,
  REGISTER_USER,
  GET_CURRENT_USER,
} from './constants';


export interface UserState {
  loading: boolean,
  error: string,
  user: User,
  isLogged: boolean,
}

const initialState: UserState = {
  loading: false,
  error: '',
  user: {},
  isLogged: false,
};

export default function user(
  state = initialState, 
  action: UserAction
): UserState {

  switch (action.type) {
    case FETCH_USER_LOADING:
      return { 
        ...state,
        error: '',
        loading: (action as LoginLoading).flag
      };
    
    case FETCH_USER_ERROR:
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
        isLogged: true,
      };
    
    case LOGOUT_USER:
      return initialState;
    
    case UPDATE_USER:
      return {
        ...state,
        loading: false,
        user: (action as UpdateUserSuccess).data.user,
      };
    
    case REGISTER_USER:
      return {
        ...state,
        loading: false,
        user: (action as RegisterSuccess).data.user,
      };
    
    case GET_CURRENT_USER:
        return {
          ...state,
          loading: false,
          user: (action as GetCurrentUser).data.user,
          isLogged: true,
        }

    default:
      return state;
  }
};
