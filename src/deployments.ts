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

  async deleteAll() {
    return await Promise.all(
      this.deployments.map((deployment) => deployment.delete())
    );
  }
}
