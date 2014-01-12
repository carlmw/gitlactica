var moment = require('moment'),
    _ = require('lodash');

module.exports = function network (subspace, git) {
  subspace.on('commits', handleCommits);
  subspace.on('events', handleEvents);
  subspace.on('fetch:repos', git.repos);
  subspace.on('fetch:repo', git.repo);
  subspace.on('fetch:commits', function (repo, days) {
    git.commits(repo, moment().subtract('days', days).format());
  });
  subspace.on('fetch:events', git.events);

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

  function handleEvents (eventData) {
    // TODO ensure we have repo data before commit
    var commits = _(eventData)
          .where({ type: 'PushEvent' })
          .map(prepareCommits)
          .flatten()
          .value()
          .reverse(),
        i = setInterval(function () {
          var commit = commits.shift();
          if (commit) git.commit(commit.repo, commit.sha);
          else clearInterval(i);
        }, 5e3);
  }

  function prepareCommits (pushEvent) {
    return _.map(pushEvent.payload.commits, function (commit) {
      commit.repo = pushEvent.repo.name;
      return commit;
    });
  }
};
