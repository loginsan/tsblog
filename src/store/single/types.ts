import {
  ArticleCore,
  Article,
  ArticleData,
  PostArticle,
  Comment,
  CommentsData,
  Tag
} from '../../types';

export interface ArticleState {
  loading: boolean,
  error: string,
  article: Article,
  comments: Comment[],
  commentsLoading: boolean,
  commentsError: string,
  favoriteFetching: boolean,
  favoriteError: string,
}

export type ArticleAction = {
  type: string,
  payload: boolean | number | string | string[] | 
    ArticleData | CommentsData | Tag | PostArticle;
}

export type { ArticleCore, Article, ArticleData, CommentsData }
