#!/usr/bin/env node

/**
 * usage:
 *   node buildkit <task>
 * task: only support usage is 'init' so far
 */
const {cmd} = require('../build/util');
process.exitCode = 0;
//process.exitCode = 1;

const {getDurationReport} = require('../build/util');
const {run} = require('../build/util');
const logger = console.log;

const cpy = require('cpy');
const path = require('path');

// expects buildkit to be executed from project root
const webpackBaseBabel = path.join(process.cwd(), 'node_modules', 'buildkit', 'webpack.base.babel.js');

(async () => {
  await cpy([webpackBaseBabel], process.cwd());
  console.log(`Files copied to ${process.cwd()}`);
})();