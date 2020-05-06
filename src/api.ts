import axios, * as Axios from 'axios';
import { sleep } from './utils';

export class APIClient {
  static Delay = 500;

  token: Token;
  repo: Repository;
  url: string;

  axios: Axios.AxiosInstance;

  private get headers() {
    return {
      Accept: 'application/vnd.github.ant-man-preview+json',
      Authorization: `Token ${this.token}`,
    };
  }

  setToken(token: Token) {
    this.token = token;
  }

  setRepository(repo: Repository) {
    this.repo = repo;
    this.url = `https://api.github.com/repos/${repo.owner}/${repo.name}`;
  }

  createInstance() {
    this.axios = axios.create({
      headers: this.headers,
      baseURL: this.url,
    });

    this.axios.interceptors.request.use(async (config) => {
      await sleep(APIClient.Delay);
      return config;
    });
  }

  async request(url: string, method?: Axios.Method, data?: any) {
    const response = await this.axios({ url, data, method });
    const responseData = await response.data;

    return responseData;
  }
}

export default new APIClient();
