import { Profile, ProfileData, Article, ArticlesData } from '../../types';

export interface ProfileState {
  loading: boolean,
  error: string,
  profile: Profile,
  listLoading: boolean,
  listError: string,
  list: Article[],
  total: number,
}

export type ProfileAction = {
  type: string,
  payload: boolean | string | ProfileData | ArticlesData,
}

export type { ProfileData, ArticlesData }
