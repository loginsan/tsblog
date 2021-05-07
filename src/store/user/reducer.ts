import {
  FETCH_USER_LOADING,
  FETCH_USER_ERROR,
  LOGIN_USER,
  LOGOUT_USER,
  UPDATE_USER,
  REGISTER_USER,
  GET_CURRENT_USER,
} from '../constants';
import { UserState, UserData, UserAction } from './types';


const initialState: UserState = {
  loading: false,
  error: '',
  user: { username: '', token: '' },
  isLogged: false,
}

export default function user(
  state = initialState, 
  action: UserAction
): UserState {

  switch (action.type) {
    case FETCH_USER_LOADING:
      return { 
        ...state,
        error: '',
        loading: action.payload as boolean
      }
    
    case FETCH_USER_ERROR:
      return { 
        ...state, 
        error: action.payload as string,
        loading: false,
      }
    
    case LOGIN_USER:
      return { 
        ...state, 
        loading: false,
        user: (action.payload as UserData).user,
        isLogged: true,
      }
    
    case LOGOUT_USER:
      return initialState;
    
    case UPDATE_USER:
      return {
        ...state,
        loading: false,
        user: (action.payload as UserData).user,
      }
    
    case REGISTER_USER:
      return {
        ...state,
        loading: false,
        user: (action.payload as UserData).user,
        isLogged: true,
      }
    
    case GET_CURRENT_USER:
      return {
        ...state,
        loading: false,
        user: (action.payload as UserData).user,
        isLogged: true,
      }

    default:
      return state;
  }
}

export function mapUserStateToProps(state: {user: UserState}) {
  const props = state.user;
  return {
    loading: props.loading, 
    error: props.error,
    user: props.user,
    isLogged: props.isLogged,
  }
}
