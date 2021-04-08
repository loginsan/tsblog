export type UserType = {
  "email": string,
  "token": string,
  "username": string,
  "bio": string,
  "image": string | null,
}

export type ProfileType = {
  "username": string,
  "bio": string,
  "image": string,
  "following": Boolean
}

export type ArticleType = {
  "slug": string,
  "title": string,
  "description": string,
  "body": string,
  "tagList": Array<string>,
  "createdAt": string,
  "updatedAt": string,
  "favorited": Boolean,
  "favoritesCount": number,
  "author": ProfileType,
}

export type BunchOfArticles = {
  "articles": Array<ArticleType>,
  "articlesCount": number,
}

export type CommentType = {
  "id": number,
  "createdAt": string,
  "updatedAt": string,
  "body": string,
  "author": ProfileType,
}

