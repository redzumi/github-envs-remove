import { prompt } from 'enquirer';

import api from './api';
import Deployments from './deployments';

type Answers = {
  token: string;
  owner: string;
  name: string;
};

const questions = [
  {
    type: 'input',
    name: 'token',
    message: 'What is your github personal access token?',
  },
  {
    type: 'input',
    name: 'owner',
    message: 'What is your repo owner?',
  },
  {
    type: 'input',
    name: 'name',
    message: 'Well, what is your repo name?',
  },
];

const main = async () => {
  const answers: Answers = await prompt(questions);

  console.log(
    '\x1b[1m%s',
    `Great, working with ${answers.owner}/${answers.name}...`
  );

  api.setToken(answers.token);
  api.setRepository({ owner: answers.owner, name: answers.name });
  api.createInstance();

  const deployments = new Deployments();

  await deployments.fetchFromAPI();
  await deployments.deleteAll();

  console.log('\x1b[1m%s', `Done. 🎉`);
};

main();
