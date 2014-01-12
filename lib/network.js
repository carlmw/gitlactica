var moment = require('moment');

module.exports = function network (subspace, git) {
  subspace.on('commits', handleCommits);
  subspace.on('fetch:repos', git.repos);
  subspace.on('fetch:repo', git.repo);
  subspace.on('fetch:commits', function (repo, days) {
    git.commits(repo, moment().subtract('days', days).format());
  });

  function handleCommits (commitData, repo) {
    var chronologicalCommits = commitData.reverse();
    var i = setInterval(function () {
      var commit = chronologicalCommits.shift();
      if (commit) {
        git.commit(repo, commit.sha);
      } else {
        clearInterval(i);
      }
    }, 5e3);
  }
};
