const {bootupCmdList} = require('./util');
const {cmd} = require('./util');
const {getDurationReport} = require('./util');
const {run} = require('./util');
let builder = {cmdList: []};

try {
  builder = require('builder');
}
catch (e) {
  console.log(`WARN could not load builder`);
}

run(
  () => {
    bootupCmdList.forEach(cmd);
    builder.cmdList.forEach(cmd);
    getDurationReport();
  },
  'total'
);

console.log('build.js END\n---------------------------------------------------------------------');
