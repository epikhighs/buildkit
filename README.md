# buildkit

## goals

1. Provide just enough infrastructure (e.g. sugar and glue) on top of existing open-source tools to develop applications in a "logical" monorepo for web and node.js projects. 
    1. A logical monorepo contains projects (which are further categorized as `apps` or `libs`) that either share dependencies or can stand to benefit from the monorepo's shared tooling.  The idea is that not all projects need to be contained in a logical monorepo, but rather a grouping of projects that make sense to be colocated. 
    1. `apps` may contain application code specific to the app and/or are composed of (dependent on) `libs`.  
    1. `libs` are standalone projects that aren't executable.  They are meant to expose APIs that are consumed either by other `libs` or `apps`.
    1. Within a logical monorepo, all projects share the same version of npm packages.  So there is no intentional support for multiple versions of a package. 
1. Boilerplate generators for projects
1. Unified task runner to run tasks for all projects, individual projects, or affected projects
    1. Affected projects contain modified files (from a git standpoint) that require certain tasks to be reran (e.g. lint/tests) 
1. Provide sensible defaults that can be extended
1. First class support for Webstorm's builtin tools/plugins (e.g. remote debugging, running the tests or apps in Webstorm's runner etc.)
1. "Absolute" path resolution so that relative imports needn't be used 

### unknowns

1. How much to assist in tooling upgrades.  Support for automated/assisted upgrades for tooling configs (e.g. webpack/babel).  I think by design most tooling configs will be pointing to a shared global config so manual upgrades should not be too taxing (when compared to having to upgrade every config for every project).

## usage

Haven't published to NPM yet, but for now can experiment by installing via git url.

```
  "devDependencies": {
    "buildkit": "git://github.com/epikhighs/buildkit.git"
  }
```

## conventions
1. agreed upon directory structure and file naming scheme
  1. project files go into `/src`
  1. test files are co-located with source files and ends with`*.test.js`
1. copies over config from build repo or make it read config from node_modules.  Can prob create a `node_modules/.bin`script that copies over base configs from `node_modules`.  This script would be run as part of the `npm run prod-build` step so on CI build server it would automatically get the config it needs.  And in webpack config's use case, can make webpack config point to a file that provides overrides.
  1. .babelrc, webpack config
1. need a node.js script that installs common packages.  Can probably read from a config file that's there per project that provides blacklist/whitelist on which packages it needs.

## initial project setup
1. create a repo
1. `npm init`
1. `npm i -D  git://github.com/epikhighs/buildkit.git`
  1. this step auto-installs all package.json `dependencies` from `buildkit`
1. `npx buildkit init`
  1. copies over base configs (babel/webpack/storybook)
1. update `package.json`'s npm scripts
  1. "server": "webpack-dev-server --config ./webpack.base.babel.js",

## packages most react projects will need ##
- initial scope
  - webpack
  - babel

- foundational
  - babel
  - cross env
  - npm-check
  - react hot loader
  - storybook
  - webpack
- code quality
  - chai
  - eslint
  - enzyme
  - istanbul/nyc
  - mocha
  - sinon
- run time libs
  - ramda
  - react
  - recompose
  - styled comp
- optional libs
  - redux
  - redux dev tool
  - redux saga
  - reselect
  
  
## project notes
- must install packages to `dependencies` and not `devDependencies` for all packages that are intended to be auto installed into consumer's repo, else the consumer of `buildkit` can't automatically get the packages in `buildkit` when running `npm i` from the consumer's repo.  Typical example will be `webpack` and `babel` should be auto installed into consumer's repo so those will go into the run-time `dependencies`.  But maybe I want to run some mocha tests to test out `buildkit` specific behavior, then mocha should be installed to `devDependencies`. But mocha is a bad example b/c I'd want mocha to be auto installed too as the testing framework of choice so that'd actually go inside `dependencies`.