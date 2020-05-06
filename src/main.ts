#!/usr/bin/env node
import api from './api';
import Deployments from './deployments';
import { askQuestion } from './utils';

const main = async () => {
  const token = await askQuestion('What is your github personal access token?');
  const owner = await askQuestion('What is your repo owner?');
  const name = await askQuestion('Well, what is your repo name?');

  console.log('\x1b[1m%s', `Great, working with ${owner}/${name}...\x1b[37m`);

  api.setToken(token);
  api.setRepository({ owner, name });
  api.createInstance();

  const deployments = new Deployments();
  await deployments.fetchFromAPI();

  console.log('\x1b[1m%s', `Processing...\x1b[37m`);
  await deployments.deleteAll();

  console.log('\x1b[1m%s', `Done. 🎉\x1b[37m`);
};

main();
