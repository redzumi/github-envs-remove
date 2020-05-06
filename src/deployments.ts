import api from './api';
import Deployment from './deployment';

const URL = '/deployments';

export default class Deployments {
  static Url = '/deployments';

  deployments: Deployment[];

  fetchFromAPI = async (): Promise<Deployment[]> => {
    const deploymentsData: FromAPI<Deployment>[] = await api.request(URL);
    const deployments = deploymentsData.map((data) => new Deployment(data));

    this.deployments = deployments;
    return this.deployments;
  };

  get(index: number) {
    return this.deployments[index];
  }

  count() {
    return this.deployments.length;
  }

  async deleteAll() {
    if (this.count() === 0) {
      return;
    }

    await Promise.all(this.deployments.map((data) => data.delete()));
    await this.fetchFromAPI();

    this.deleteAll();
  }
}
