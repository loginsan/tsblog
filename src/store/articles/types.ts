import { Article, ArticlesData, ArticleData } from '../../types';

export interface ArticlesState {
  loading: boolean,
  error: string,
  page: number,
  list: Article[],
  total: number,
  tag: string | null,
  favoriteFetching: boolean,
  favoriteError: string,
}

export interface PageNum {
  type: string,
  payload: number,
}

export type ArticlesAction = {
  type: string,
  payload: boolean | string | number | ArticlesData | ArticleData;
}

export type { Article, ArticlesData, ArticleData }
