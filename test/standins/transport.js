// TODO move this into something neater
var repoJSON = JSON.stringify({ full_name: 'carlmw/gitlactica' }),
    commitsJSON = JSON.stringify([
      { sha: 'd94709d1942c14fe4bd06e24e9639ed30232b58e' },
      { sha: '8b07ccd197085a2c9aac1cc04aef93750aafd49d' }
    ]);

module.exports.xhr = function (opts, callback) {
  log('Requested ' + opts.uri);
  if (opts.uri === 'https://api.github.com/repos/carlmw/gitlactica') {
    callback(null, null, repoJSON);
  }
  if (opts.uri === 'https://api.github.com/repos/carlmw/gitlactica/commits?since=2013-11-04T00:00:00+00:00') {
    callback(null, null, commitsJSON);
  }
};
