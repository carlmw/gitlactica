# gitlactica [![Build Status](https://travis-ci.org/carlmw/gitlactica.png?branch=master)](https://travis-ci.org/carlmw/gitlactica)

## Installation
    npm install grunt-cli -g
    npm install
    grunt

### Run the app
    node web.js

or use foreman

    foreman start

## Development
    grunt watch

## Run the tests
    grunt simplemocha
    grunt integration

NOTE: The integration tests depend on [http://slimerjs.org/](slimerjs) which can be installed via homebrew.

    brew install slimerjs

## Creating a Heroku app
    heroku create <APP NAME> --buildpack https://github.com/mbuchetics/heroku-buildpack-nodejs-grunt.git
    heroku labs:enable user-env-compile -a <APP NAME>
    heroku config:set NODE_ENV=production
    heroku config:set GITHUB_CLIENT_ID=<YOUR GITHUB APPLICATION CLIENT ID>
    heroku config:set GITHUB_CLIENT_SECRET=<YOUR GITHUB APPLICATION CLIENT SECRET>

## Deploying to Heroku
    git push heroku master
