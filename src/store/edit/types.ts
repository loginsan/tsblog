import { ArticleCore, Article, ArticleData, Tag, PostArticle } from '../../types';

export interface EditState {
  loading: boolean,
  error: string,
  article: Article,
  tagList: Tag[],
}

export type { ArticleCore, Article, ArticleData, Tag, PostArticle }
