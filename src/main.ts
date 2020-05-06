import api from './api';
import Deployments from './deployments';
import Deployment from './deployment';

const main = async (token: string, repo: Repository) => {
  api.setToken(token);
  api.setRepository(repo);
  api.createInstance();

  const deployments = new Deployments();

  await deployments.fetchFromAPI();
  await deployments.deleteAll();

  console.log(`Done. 🎉`);
};

main('token', {
  owner: 'owner',
  name: 'repo',
});
