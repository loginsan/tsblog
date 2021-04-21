import { 
  Article,
  ArticlesData, 
  ArticleData, 
  UserData,
  User,
  ProfileData,
  CommentsData,
} from '../types';

type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Payload = UserData | ArticleData;

export async function http<T>(
  url: string, 
  token: string = '',
  method: Methods = 'GET',
  value?: Payload
): Promise<T> {

  const request: RequestInit = {};
  request.method = method;
  if (method === 'POST' || method === 'PUT') {
    request.headers = { 
      'Content-Type': 'application/json;charset=utf-8',
    };
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
  // Access-Control-Allow-Origin: https://conduit.productionready.io
  const response = await fetch(url, request);
  if (!response.ok) {
    const errorsData: string = await response.text();
    throw new Error(`${response.status}|${errorsData}`);
  }
  const body:T = await response.json();
  return body;
}


class APIService {

  base = 'https://conduit.productionready.io/api';

  limit = 20;

  from = 0; // 240000;

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
    const url = this.endURL('/articles', 
      `limit=${this.limit}` + 
      `&offset=${this.from + (page - 1) * this.limit}` +
      `${tag? `&tag=${tag}` : ''}` +
      `${author? `&author=${author}` : ''}`
    );
    const data = await http<ArticlesData>(url, token);
    return data as ArticlesData;
  }

  async getArticle(slug: string, token: string = ''): Promise<ArticleData> {
    const url = this.endURL(`/articles/${slug}`);
    const data = await http<ArticleData>(url, token);
    return data as ArticleData;
  }

  async authUser(email: string, password: string): Promise<UserData> {
    const value: UserData = { user: { email, password } };
    const url = this.endURL(`/users/login`);
    const data = await http<UserData>(url, '', 'POST', value);
    return data as UserData;
  }

  async updateUser(token: string, user: User): Promise<UserData> {
    const value: UserData = { user };
    const url = this.endURL(`/user`);
    const data = await http<UserData>(url, token, 'PUT', value);
    return data as UserData;
  }

  async getUser(token: string): Promise<UserData> {
    const url = this.endURL(`/user`);
    const data = await http<UserData>(url, token);
    return data as UserData;
  }

  async registerUser(user: User): Promise<UserData> {
    const value: UserData = { user };
    const url = this.endURL(`/users`);
    const data = await http<UserData>(url, '', 'POST', value);
    return data as UserData;
  }

  async getProfile(username: string, token: string): Promise<ProfileData> {
    const url = this.endURL(`/profiles/${encodeURIComponent(username)}`);
    const data = await http<ProfileData>(url, token);
    return data as ProfileData;
  }

  async getComments(slug: string, token: string): Promise<CommentsData> {
    const url = this.endURL(`/articles/${slug}/comments`);
    const data = await http<CommentsData>(url, token);
    return data as CommentsData;
  }

  async setFavorite(
    slug: string, 
    flag: boolean,
    token: string 
  ): Promise<ArticleData> {
    const url = this.endURL(`/articles/${slug}/favorite`);
    const data = await http<ArticleData>(url, token, flag? 'DELETE' : 'POST');
    return data as ArticleData;
  }

  async createArticle(article: Article, token: string): Promise<ArticleData> {
    const value: ArticleData = { article };
    const url = this.endURL(`/articles`);
    const data = await http<ArticleData>(url, token, 'POST', value);
    return data as ArticleData;
  }

  async updateArticle(
    slug: string,
    article: Article,
    token: string
  ): Promise<ArticleData> {
    const value: ArticleData = { article };
    const url = this.endURL(`/articles/${slug}`);
    const data = await http<ArticleData>(url, token, 'PUT', value);
    return data as ArticleData;
  }

  async deleteArticle(slug: string, token: string): Promise<ArticleData> {
    const url = this.endURL(`/articles/${slug}`);
    const data = await http<ArticleData>(url, token, 'DELETE');
    return data as ArticleData;
  }

  async getAuthorArticles(
    author: string,
    token: string = ''
  ): Promise<ArticlesData> {
    const url = this.endURL('/articles', 
      `limit=1000&offset=0&author=${author}`
    );
    const data = await http<ArticlesData>(url, token);
    return data as ArticlesData;
  }

}

export default new APIService();
