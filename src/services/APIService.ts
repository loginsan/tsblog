import { 
  ArticlesData, 
  ArticleData, 
  UserData,
  User,
} from '../types';

type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Payload = UserData;

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

  async getArticle(slug: string): Promise<ArticleData> {
    const url = this.endURL(`/articles/${slug}`);
    const data = await http<ArticleData>(url);
    return data as ArticleData;
  }

  async authUserRequest(email: string, password: string): Promise<UserData> {
    const value: UserData = { user: { email, password } };
    const url = this.endURL(`/users/login`);
    const data = await http<UserData>(url, '', 'POST', value);
    return data as UserData;
  }

  async updateUserRequest(token: string, user: User): Promise<UserData> {
    const value: UserData = { user };
    const url = this.endURL(`/user`);
    const data = await http<UserData>(url, token, 'PUT', value);
    return data as UserData;
  }

  async getUserRequest(token: string): Promise<UserData> {
    const url = this.endURL(`/user`);
    const data = await http<UserData>(url, token);
    return data as UserData;
  }

  async registerUserRequest(user: User): Promise<UserData> {
    const value: UserData = { user };
    const url = this.endURL(`/users`);
    const data = await http<UserData>(url, '', 'POST', value);
    return data as UserData;
  }

}

export default new APIService();
