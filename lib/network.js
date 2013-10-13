var moment = require('moment');

module.exports = function network (repo, subspace, git) {
  subspace.on('repo', handleRepo);
  subspace.on('commits', handleCommits);
  git.repo(repo);

  function handleRepo (repoData) {
    git.commits(repo, moment().startOf('month').format());
  }

  function handleCommits (commitData) {
    var i = setInterval(function () {
      var commit = commitData.shift();
      if (commit) {
        git.commit(repo, commit.sha);
      } else {
        clearInterval(i);
      }
    }, 5e3);
  }
};
