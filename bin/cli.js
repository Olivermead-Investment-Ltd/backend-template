#!/usr/bin/env node

/***
 * This script sets up the backend template
 * Created by Kilson david
 * https://github.com/kwaysi/
 */

const { execSync } = require('child_process');

// Run shell scripts synchronously to catch errors
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

// Clone Repository
const gitCheckoutCMD = `git clone --depth 1 https://github.com/Olivermead-Investment-Ltd/backend-template.git ${repoName}`;
console.log(`Cloning arvo backend template`);
const checkout = run(gitCheckoutCMD);
if (!checkout) process.exit(-1);

// Install dependencies
const installDependencies = `cd ${repoName} && yarn install && yarn global add nodemon typescript tsc ts-node`;
console.log(`Installing dependencies into ${repoName}`);
let installDeps = run(installDependencies);
if (!installDeps) process.exit(-1);

// Initialize migration and seeders folder
const setupDB = `cd ${repoName} && yarn sequelize-cli init:migrations && yarn sequelize-cli init:seeders`;
console.log(`Setting up modules for ${repoName}`);
const dbSetup = run(setupDB);
if (!dbSetup) process.exit(-1);

// Delete bin folder from project
const deleteBin = `cd ${repoName} && rm -rf bin`;
console.log(`Removing setup dependencies for ${repoName}`);
const deleteBinComplete = run(deleteBin);
if (!deleteBinComplete) process.exit(-1);

// Initialize .env file
const envCMD = `cd ${repoName} && cp .env.sample .env`;
console.log('Create .env file for you.');
const createEnv = run(envCMD);
if (!createEnv) process.exit(-1);

console.log('Setup complete!');
console.log('Set up your .env and run the following commands to get started');
console.log(`\ncd ${repoName} && yarn dev\n`);
console.log('Happy coding!');
