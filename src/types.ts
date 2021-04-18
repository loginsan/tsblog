export type User = {
  email?: string,
  token?: string,
  username?: string,
  bio?: string,
  image?: string | null,
  password?: string,
}

export type Profile = {
  username?: string,
  bio?: string,
  image?: string,
  following?: boolean,
}

export type Article = {
  slug?: string,
  title?: string,
  description?: string,
  body?: string,
  tagList?: string[],
  createdAt?: string,
  updatedAt?: string,
  favorited?: boolean,
  favoritesCount?: number,
  author?: Profile,
}

export type Comment = {
  id?: number,
  createdAt?: string,
  updatedAt?: string,
  body?: string,
  author?: Profile,
}


export type ArticleData = {
  article: Article,
}

export type ArticlesData = {
  articles: Article[],
  articlesCount: number,
}

export type UserData = {
  user: User,
}
