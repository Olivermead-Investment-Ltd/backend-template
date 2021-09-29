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
const gitCheckoutCMD = `git clone --depth 1 https://github.com/Olivermead-Investment-Ltd/backend-template.git ${repoName}`;
const installDependencies = `cd ${repoName} && yarn insall`;
const setupDB = `yarn sequelize-cli init`;

console.log(`Cloning arvo backend template`);
const checkout = run(gitCheckoutCMD);
if (!checkout) process.exit(-1);

console.log(`Installing dependencies into ${repoName}`);
let installDeps = run(installDependencies);
if (!installDeps) process.exit(-1);

console.log(`Setting up modules for ${repoName}`);

const dbSetup = run(setupDB);
if (!dbSetup) process.exit(-1);

console.log('Setup complete! Happy coding! \n Set up your .env and run the following commands');
console.log(`cd ${repoName} && yarn dev`);
