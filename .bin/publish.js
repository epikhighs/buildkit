#!/usr/bin/env node

/**
 * usage:
 *   node publish major|minor|patch
 */
const {cmd} = require('../src/util');
const {getDurationReport} = require('../src/util');
const {run} = require('../src/util');
const logger = console.log;

const version = process.argv[2];

const versionType = {
  major: true,
  minor: true,
  patch: true,
};

if (versionType[version] === undefined) {
  throw new Error('version required. Must be one of major|minor|patch')
}

/* Must have
1. no local changes (all commits must be made locally)
*/
const uncommittedChanges = cmd('git status --porcelain');

if (uncommittedChanges.trim().length > 0) {
  throw new Error('commit all local changes before publishing');
}

run(
  () => {
    [
      () => logger(`publish.js START\n---------------------------------------------------------------------`),
      `npm version ${version} -m '%s'`,
      `git push --force`, // using force to handle rebases
      `git push --tag`,
      `npm publish`,
      () => logger(`Repo has been published.  Remember to merge your branch to master.`),
    ].forEach(cmd);
    getDurationReport();
  },
  'total'
);

console.log('publish.js END\n---------------------------------------------------------------------');
