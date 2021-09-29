#!/usr/bin/env node
const { execSync } = require('child_process');

const run = (command) => {
  try {
    execSync(`${command}`, { stdio: 'inherit' });
  } catch (error) {
    console.log(`Failed to execute command \n ${command}`, error);
    return false;
  }
  return true;
};

const repoName = process.argv[2];
const installDependencies = `cd ${repoName} && yarn install`;
const gitCheckoutCMD = `git clone --depth 1 https://github.com/Olivermead-Investment-Ltd/backend-template.git ${repoName}`;

console.log(`Cloning arvo backend template`);
const checkout = run(gitCheckoutCMD);
if (!checkout) process.exit(-1);

console.log(`Installing dependencies into ${repoName}`);
let installDeps = run(installDependencies);
if (!installDeps) process.exit(-1);

// const setupDB = `cd ${repoName} && yarn sequelize-cli init`;
// console.log(`Setting up modules for ${repoName}`);
// const dbSetup = run(setupDB);
// if (!dbSetup) process.exit(-1);

console.log('Setup complete! Happy coding! \nSet up your .env and run the following commands');
console.log(`cd ${repoName} && yarn dev`);
