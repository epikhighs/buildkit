#!/usr/bin/env node

/**
 * usage:
 *   node buildkit <task>
 * task: only support usage is 'init' so far
 */
const {cmd} = require('../src/util');
process.exitCode = 0;
//process.exitCode = 1;

const {getDurationReport} = require('../src/util');
const {run} = require('../src/util');
const logger = console.log;

const cpy = require('cpy');
const path = require('path');

// expects buildkit to be executed from project root
//path.join();

(async () => {
  await cpy(['../webpack.base.babel.js'], process.cwd());
  console.log('Files copied!');
})();