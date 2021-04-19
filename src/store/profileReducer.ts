import { Profile, ProfileData } from '../types';
import { ProfileAction } from './profileActions';
import {
  FETCH_PROFILE_LOADING,
  FETCH_PROFILE_ERROR,
  FETCH_PROFILE,
} from './constants';


export interface ProfileState {
  loading: boolean,
  error: string,
  profile: Profile,
}

const initialState: ProfileState = {
  loading: false,
  error: '',
  profile: {},
};

export default function profile(
  state = initialState, 
  action: ProfileAction
): ProfileState {

  switch (action.type) {
    case FETCH_PROFILE_LOADING:
      return { 
        ...state,
        error: '',
        loading: action.payload as boolean
      };
    
    case FETCH_PROFILE_ERROR:
      return { 
        ...state, 
        error: action.payload as string,
        loading: false,
      };
    
    case FETCH_PROFILE: {
      const data = action.payload as ProfileData;
      return { 
        ...state, 
        loading: false,
        profile: data.profile,
      };
    }

    default:
      return state;
  }
};
