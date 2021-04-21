import { Profile, ProfileData, Article, ArticlesData } from '../types';
import { ProfileAction } from './profileActions';
import {
  FETCH_PROFILE_LOADING,
  FETCH_PROFILE_ERROR,
  FETCH_PROFILE,
  FETCH_AUTHOR_LIST_LOADING,
  FETCH_AUTHOR_LIST_ERROR,
  FETCH_AUTHOR_LIST,
} from './constants';


export interface ProfileState {
  loading: boolean,
  error: string,
  profile: Profile,
  listLoading: boolean,
  listError: string,
  list: Article[],
  total: number,
}

const initialState: ProfileState = {
  loading: false,
  error: '',
  profile: {},
  listLoading: false,
  listError: '',
  list: [],
  total: 0,
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

    case FETCH_AUTHOR_LIST_LOADING:
      return { 
        ...state,
        listError: '',
        listLoading: action.payload as boolean
      };
    
    case FETCH_AUTHOR_LIST_ERROR:
      return { 
        ...state, 
        listError: action.payload as string,
        listLoading: false,
      };
    
    case FETCH_AUTHOR_LIST: {
      const data = action.payload as ArticlesData;
      return { 
        ...state, 
        listLoading: false,
        list: data.articles,
        total: data.articlesCount,
      };
    }

    default:
      return state;
  }
};
