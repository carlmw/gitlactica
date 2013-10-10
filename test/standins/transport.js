// TODO move this into something neater
var repoJSON = '{"full_name": "carlmw/gitlactica"}';

module.exports.xhr = function (opts, callback) {
  log('Requested ' + opts.uri);
  if (opts.uri === 'https://api.github.com/repos/carlmw/gitlactica') {
    callback(null, null, repoJSON);
  }
};
