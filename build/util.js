const {execSync} = require('child_process');
const { performance } = require('perf_hooks');
const logger = console.log;

/**
 * Accepts either a string to execute via the CLI or a function to execute.
 */
function cmd (cmd = '') {

  if (typeof cmd === 'function') {
    return run(cmd, 'function');
  }
  else if (cmd.trim().length === 0) {
    throw new Error(`util.js: cmd required.`);
  }

  let perfName = 'EXEC';
  try {
    logger(`builder.js ${perfName}: ${cmd}`);
    // try using execSpawn instead
    const buffer = run(() => execSync(cmd), perfName);
    const output = buffer.toString();

    if (output.length > 0) {
      logger(output);
    }
    return output;
  }
  catch (e) {
    // stdout/stderr can be null
    const stdout = e.stdout || '';
    const stderr = e.stdout || '';
    const stack = e.stack || '';
    console.error(stdout.toString(), stderr.toString(), stack);
    e.options.args.forEach(console.error);
    throw (e);
  }
  finally {
    performance.clearMarks(perfName);
    performance.clearEntries(perfName);
  }
}

function toReadable (ms) {

  if (ms < 1000) {
    return `${parseInt(ms)}ms`;
  }

  if (ms < 60000) {
    let seconds = (ms / 1000).toFixed(1);
    if (seconds.endsWith('.0')) {
      seconds = seconds.replace('.0', '');
    }
    return  `${seconds}s`;
  }

  if (ms >= 60000) {
    let seconds = ms / 1000;
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = parseInt(seconds % 60);
    return  `${minutes}m ${remainingSeconds}s`;
  }

  return `${parseInt(ms)}`;
}


function perfLog (name) {
  let marks = performance.getEntriesByName(name);
  // in milliseconds
  let duration = marks[1].startTime - marks[0].startTime;
  return {
    msg: `DURATION ${name}: ${toReadable(duration)}`,
    duration,
  };
}

const entireLogRun = [];

function getDurationReport () {
  // prints better w/ no duplication
  logger(entireLogRun);
}

function run (fn, name) {
  performance.mark(name);
  const result = fn();
  performance.mark(name);

  let log = perfLog(name);

  if (log.duration > 500) {
    entireLogRun.push(log.msg);
    logger(log.msg);
  }

  performance.clearMarks(name);
  performance.clearEntries(name);
  return result;
}

const file = `.npmrc`;

const bootupCmdList = Object.freeze([
  () => logger(`builder.js START\n---------------------------------------------------------------------`),
  () => logger(`-------------- ENV VARS --------------`),
  `env | sort`,
  () => logger(`-------------- NODE VERSION --------------`),
  `node -v`,
  () => logger(`-------------- NPM VERSION --------------`),
  `npm -v`,
  () => logger(`-------------- NPX VERSION --------------`),
  `npx -v`,
  () => logger(`-------------- NPM INSTALL --------------`),
  `npm i`,
]);

module.exports = {
  bootupCmdList,
  cmd,
  getDurationReport,
  toReadable,
  perfLog,
  run,
};
