// TODO move this into something neater, nock?
var repo = { full_name: 'carlmw/gitlactica', language: 'JavaScript' },
    moment = require('moment'),
    firstCommit = { committer: { login: 'carlmw' }, files: [{ additions: 10, deletions: 5 }] },
    secondCommit = { committer: { login: 'bobson' }, files: [{ additions: 15, deletions: 20 }] },
    commits = [
      { sha: 'd94709d1942c14fe4bd06e24e9639ed30232b58e' },
      { sha: '8b07ccd197085a2c9aac1cc04aef93750aafd49d' }
    ];

module.exports.xhr = function (opts, callback) {
  if (opts.uri === 'https://api.github.com/repos/carlmw/gitlactica') {
    respond(repo);
    return;
  }
  if (opts.uri === 'https://api.github.com/repos/carlmw/gitlactica/commits?since=' + moment().startOf('month').format()) {
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
