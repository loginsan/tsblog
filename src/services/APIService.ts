import { 
  ArticleCore,
  PostArticle,
  ArticlesData, 
  ArticleData, 
  UserData,
  User,
  ProfileData,
  CommentsData,
} from '../types';

enum Method {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE'
}

type Payload = UserData | ArticleData | PostArticle;

export async function http<T>(
  url: string, 
  token: string = '',
  method: Method = Method.Get,
  value?: Payload
): Promise<T> {

  const request: RequestInit = {};
  request.method = method;
  if (method === Method.Post || method === Method.Put) {
    request.headers = { 
      'Content-Type': 'application/json;charset=utf-8',
    }
    request.body = JSON.stringify(value);
  }
  if (token !== '') {
    request.headers = {
      ...request.headers,
      'Authorization': `Token ${token}`
    }
  }
  request.headers = {
    ...request.headers,
    'Access-Control-Allow-Origin': `https://conduit.productionready.io`
  }
  const response = await fetch(url, request);
  if (!response.ok) {
    let errorsData: string = await response.text();
    if (errorsData[0] === '<') {
      errorsData = `html page returned for status ${response.status}`;
    }
    throw new Error(`${response.status}|${errorsData}`);
  }
  const body:T = await response.json();
  return body;
}


class APIService {

  base = 'https://conduit.productionready.io/api';

  limit = 20;

  from = 0;

  endURL(endpoint: string, params: string = ''): string {
    const str = params? `?${params}` : '';
    const url = `${this.base}${endpoint}${str}`;
    return url;
  }

  async getArticles(
    page: number = 1,
    token: string = '',
    tag?: string, 
    author?: string
  ): Promise<ArticlesData> {
    const offset = this.from + (page - 1) * this.limit;
    const url = this.endURL('/articles', 
      `limit=${this.limit}&offset=${offset}` +
      `${tag? `&tag=${tag}` : ''}${author? `&author=${author}` : ''}`
    );
    const data = await http<ArticlesData>(url, token);
    return data;
  }

  async getArticle(slug: string, token: string = ''): Promise<ArticleData> {
    const url = this.endURL(`/articles/${slug}`);
    const data = await http<ArticleData>(url, token);
    return data;
  }

  async authUser(email: string, password: string): Promise<UserData> {
    const value: UserData = { user: { email, password, username: '' } };
    const url = this.endURL(`/users/login`);
    const data = await http<UserData>(url, '', Method.Post, value);
    return data;
  }

  async updateUser(token: string, user: User): Promise<UserData> {
    const value: UserData = { user };
    const url = this.endURL(`/user`);
    const data = await http<UserData>(url, token, Method.Put, value);
    return data;
  }

  async getUser(token: string): Promise<UserData> {
    const url = this.endURL(`/user`);
    const data = await http<UserData>(url, token);
    return data;
  }

  async registerUser(user: User): Promise<UserData> {
    const value: UserData = { user };
    const url = this.endURL(`/users`);
    const data = await http<UserData>(url, '', Method.Post, value);
    return data;
  }

  async getProfile(username: string, token: string): Promise<ProfileData> {
    const url = this.endURL(`/profiles/${encodeURIComponent(username)}`);
    const data = await http<ProfileData>(url, token);
    return data;
  }

  async getComments(slug: string, token: string): Promise<CommentsData> {
    const url = this.endURL(`/articles/${slug}/comments`);
    const data = await http<CommentsData>(url, token);
    return data;
  }

  async setFavorite(
    slug: string, 
    flag: boolean,
    token: string 
  ): Promise<ArticleData> {
    const url = this.endURL(`/articles/${slug}/favorite`);
    const data = await http<ArticleData>(url, token, 
      flag? Method.Delete : Method.Post);
    return data;
  }

  async createArticle(
    article: ArticleCore, 
    token: string
  ): Promise<ArticleData> {
    const value: PostArticle = { article };
    const url = this.endURL(`/articles`);
    const data = await http<ArticleData>(url, token, Method.Post, value);
    return data;
  }

  async updateArticle(
    slug: string,
    article: ArticleCore,
    token: string
  ): Promise<ArticleData> {
    const value: PostArticle = { article };
    const url = this.endURL(`/articles/${slug}`);
    const data = await http<ArticleData>(url, token, Method.Put, value);
    return data;
  }

  async deleteArticle(slug: string, token: string): Promise<ArticleData> {
    const url = this.endURL(`/articles/${slug}`);
    const data = await http<ArticleData>(url, token, Method.Delete);
    return data;
  }

  async getAuthorArticles(
    author: string,
    token: string = ''
  ): Promise<ArticlesData> {
    const url = this.endURL('/articles', 
      `limit=1000&offset=0&author=${author}`
    );
    const data = await http<ArticlesData>(url, token);
    return data;
  }

}

export default new APIService();
