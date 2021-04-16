import { 
  ArticlesResponse, 
  ArticleResponse, 
  UserResponse, 
  AuthRequest,
  User,
} from '../types';

type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Payload = AuthRequest | UserResponse;

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

  from = 240000;

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
  ): Promise<ArticlesResponse> {
    const url = this.endURL('/articles', 
      `limit=${this.limit}` + 
      `&offset=${this.from + (page - 1) * this.limit}` +
      `${tag? `&tag=${tag}` : ''}` +
      `${author? `&author=${author}` : ''}`
    );
    const data = await http<ArticlesResponse>(url, token);
    return data as ArticlesResponse;
  }

  async getArticle(slug: string): Promise<ArticleResponse> {
    const url = this.endURL(`/articles/${slug}`);
    const data = await http<ArticleResponse>(url);
    return data as ArticleResponse;
  }

  async authUserRequest(email: string, pass: string): Promise<UserResponse> {
    const value: AuthRequest = {
      user: {
        email,
        password: pass,
      }
    }
    const url = this.endURL(`/users/login`);
    const data = await http<UserResponse>(url, '', 'POST', value);
    return data as UserResponse;
  }

  async updateUserRequest(
    token: string,
    user: User
  ): Promise<UserResponse> {
    const value: UserResponse = { user };
    const url = this.endURL(`/user`);
    const data = await http<UserResponse>(url, token, 'PUT', value);
    return data as UserResponse;
  }

  async getUserRequest(token: string): Promise<UserResponse> {
    const url = this.endURL(`/user`);
    const data = await http<UserResponse>(url, token);
    return data as UserResponse;
  }

  async registerUserRequest(user: User): Promise<UserResponse> {
    const value: UserResponse = { user };
    const url = this.endURL(`/users`);
    const data = await http<UserResponse>(url, '', 'POST', value);
    return data as UserResponse;
  }

}

export default new APIService();
