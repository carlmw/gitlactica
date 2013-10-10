var moment = require('moment');

module.exports = function (repo, github, subspace, renderer) {
  subspace.on('repo', handleRepo);
  subspace.on('commits', handleCommits);
  github.repo(repo);

  function handleRepo (repoData) {
    renderer.addPlanet(repoData.full_name, 0xffffff);
    renderer.movePlanet(repoData.full_name, 0, 0, 0);
    renderer.lookAt(0, 0, 0);

    github.commits(repo, moment().startOf('month').format());
  }

  function handleCommits (commitData) {
    var i = setInterval(function () {
      var commit = commitData.shift();
      if (commit) {
        github.commit(repo, commit.sha);
      } else {
        clearInterval(i);
      }
    }, 1e3);
  }
};
