# buildkit

## conventions
1. agreed upon directory structure and file naming scheme
  1. /src with *.test.js
1. copies over config from build repo or make it read config from node_modules.  Can prob create a `node_modules/.bin`script that copies over base configs from `node_modules`.  This script would be run as part of the `npm run prod-build` step so on CI build server it would automatically get the config it needs.  And in webpack config's use case, can make webpack config point to a file that provides overrides.
  1. .babelrc, webpack config
1. need a node.js script that installs common packages.  Can probably read from a config file that's there per project that provides blacklist/whitelist on which packages it needs.

## initial project setup
1. npm install packages
1. copy over base configs (babel/webpack/storybook)

## packages most react projects will need ##
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