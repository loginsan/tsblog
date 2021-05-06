import { User, UserData } from '../../types';

export interface UserState {
  loading: boolean,
  error: string,
  user: User,
  isLogged: boolean,
}

export type UserAction = {
  type: string,
  payload: boolean | string | UserData
}

export type { UserData, User }
