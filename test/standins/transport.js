// TODO move this into something neater
var repo = { full_name: 'carlmw/gitlactica' },
    firstCommit = {},
    secondCommit = {},
    commits = [
      { sha: 'd94709d1942c14fe4bd06e24e9639ed30232b58e' },
      { sha: '8b07ccd197085a2c9aac1cc04aef93750aafd49d' }
    ];

module.exports.xhr = function (opts, callback) {
  log('Requested ' + opts.uri);
  if (opts.uri === 'https://api.github.com/repos/carlmw/gitlactica') {
    respond(repo);
    return;
  }
  if (opts.uri === 'https://api.github.com/repos/carlmw/gitlactica/commits?since=2013-10-01T00:00:00+01:00') {
    respond(commits);
    return;
  }
  if (opts.uri === 'https://api.github.com/repos/carlmw/gitlactica/commits/d94709d1942c14fe4bd06e24e9639ed30232b58e') {
    respond(firstCommit);
    return;
  }
  if (opts.uri === 'https://api.github.com/repos/carlmw/gitlactica/commits/8b07ccd197085a2c9aac1cc04aef93750aafd49d') {
    respond(secondCommit);
    return;
  }

  throw "Unhandled request " + opts.uri;

  function respond (responseData) {
    callback(null, null, JSON.stringify(responseData));
  }
};
