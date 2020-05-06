import * as readline from 'readline';

export const sleep = (delay: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, delay));

export const askQuestion = (question: string): Promise<string> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(
      `\x1b[37m\x1b[1m${question}\x1b[0m\x1b[32m `,
      (answer: string) => {
        rl.close();
        resolve(answer.trim());
      }
    )
  );
};
