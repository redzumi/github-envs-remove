import api from './api';
import Deployments from './deployments';

export default class Deployment {
  ref: string;

  id?: number;
  url?: string;
  statuses_url: string;
  description?: string;

  constructor(deploy: FromAPI<Deployment>) {
    this.update(deploy);
  }

  update(deploy: FromAPI<Deployment>) {
    Object.assign(this, deploy);
    return this;
  }

  async push() {
    if (this.id) {
      throw new Error('Already exist.');
    }

    const deploy = await api.request(Deployments.Url, 'POST', {
      ref: this.ref,
      description: this.description,
    });

    return this.update(deploy);
  }

  async setStatus(status: string) {
    return await api.request(this.statuses_url, 'POST', { state: status });
  }

  async delete() {
    return await api.request(this.url, 'DELETE');
  }
}
