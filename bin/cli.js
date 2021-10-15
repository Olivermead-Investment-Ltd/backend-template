#!/usr/bin/env node

/***
 * This script sets up the backend template
 * Created by Kilson david
 * https://github.com/kwaysi/
 */

const { execSync } = require('child_process');

const isWin = process.platform === 'win32';

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
const gitCheckoutCMD = `git clone --depth 1 https://github.com/Kwaysi/backend-template.git ${repoName}`;
console.log(`Cloning arvo backend template`);
const checkout = run(gitCheckoutCMD);
if (!checkout) process.exit(-1);

// Install dependencies
const installDependencies = `cd ${repoName} && yarn install && yarn global add nodemon typescript tsc ts-node`;
console.log(`Installing dependencies into ${repoName}`);
let installDeps = run(installDependencies);
if (!installDeps) {
  console.log('\n\nFailed to install dependencies');
  console.log(
    '\n\nPlease run: yarn install && yarn global add nodemon typescript tsc ts-node '
  );
  console.log('After the setup is done\n\n');
} else {
  // Initialize migration and seeders folder
  const setupDB = `cd ${repoName} && yarn sequelize-cli init:migrations && yarn sequelize-cli init:seeders`;
  console.log(`Setting up modules for ${repoName}`);
  run(setupDB);
  // if (!dbSetup) process.exit(-1);
}

// Delete folders from project
const deleteFolders = `cd ${repoName} && ${isWin ? 'rd /s /q bin && rd /s /q .git' : 'rm -rf bin && rm -rf .git'}`;
console.log(`Removing folders for ${repoName}`);
const deleteComplete = run(deleteFolders);
if (!deleteComplete) process.exit(-1);

// Initialize .env file
const envCMD = `cd ${repoName} &&${isWin ? 'copy .env.sample .env' : 'cp .env.sample .env'}`;
console.log('Create .env file for you.');
const createEnv = run(envCMD);
if (!createEnv) process.exit(-1);

// Initialize git
const gitCMD = `cd ${repoName} && git init && git add . && git commit -m "Initial commit"`;
console.log('Initializing git....');
const initGit = run(gitCMD);
if (!initGit) process.exit(-1);

console.log('Setup complete!');
console.log('Set you git upstream repo by running');
console.log('\ngit remote set-url origin {newGitURL}\n');
console.log('Set up your .env and run the following commands to get started');
console.log(`\ncd ${repoName} && yarn dev\n`);
console.log('Happy coding!');