import { BunchOfArticles } from "../types";

type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE';

export async function http<T>(
  url: string, 
  method: Methods = 'GET', 
  value = null
): Promise<T> {

  const request: RequestInit = {};
  request.method = method;
  if (method === 'POST' || method === 'PUT') {
    request.headers = { 'Content-Type': 'application/json;charset=utf-8' };
    request.body = JSON.stringify(value);
  }
  const response = await fetch(url, request);
  if (!response.ok) {
    throw new Error(`Can't send request, recieve ${response.status}`);
  }
  const body:T = await response.json();
  return body;
}


class APIService {

  base: string = "https://conduit.productionready.io/api";

  limit: number = 20;

  endURL(endpoint: string, params: string = ''): string {
    const str: string = params? `?${params}` : '';
    const url: string = `${this.base}${endpoint}${str}`;
    return url;
  }

  async getArticles(
    page: number = 1, 
    tag?: string, 
    author?: string
  ): Promise<BunchOfArticles> {
    const url: string = this.endURL("/articles", 
      `limit=${this.limit}` + 
      `&offset=${(page - 1) * this.limit}` +
      `${tag? `&tag=${tag}` : ""}` +
      `${author? `&author=${author}` : ""}`
    );
    try {
      const data = await http<BunchOfArticles>(url);
      return data as BunchOfArticles;
    } catch (err) {
      console.log(`catch an error, ${err}`);
      return { "articles": [], "articlesCount": 0 }
    }
  }

}

export default new APIService();
