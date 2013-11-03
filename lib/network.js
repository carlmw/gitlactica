var moment = require('moment');

module.exports = function network (subspace, git) {
  subspace.on('repo', handleRepo);
  subspace.on('commits', handleCommits);
  subspace.on('fetch:repos', git.repos);
  subspace.on('fetch:repo', git.repo);

  function handleRepo (repoData) {
    git.commits(repoData.full_name, moment().startOf('month').format());
  }

  function handleCommits (commitData, repo) {
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
