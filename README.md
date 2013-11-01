# gitlactica

## Installation
    npm install grunt-cli -g
    npm install
    grunt

### Run the app
    node app.js

or use foreman

    foreman start

## Development
    grunt watch
    grunt connect

## Run the tests
    grunt simplemocha

## Creating a Heroku app
    heroku create <appname> --buildpack https://github.com/mbuchetics/heroku-buildpack-nodejs-grunt.git
    heroku labs:enable user-env-compile -a <appname>
    heroku config:set NODE_ENV=production

## Deploying to Heroku
    git push heroku master
