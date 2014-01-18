var moment = require('moment'),
    _ = require('lodash');

module.exports = function network (subspace, git) {
  subspace.on('fetch:repos', function () {
    git.repos().then(handleRepos);
  });
  subspace.on('fetch:repo', function (name) {
    git.repo(name).then(handleRepo);
  });
  subspace.on('fetch:commits', function (repo, days) {
    var since = moment().subtract('days', days).format();
    git.commits(repo, since).then(_.partial(handleCommits, repo));
  });
  subspace.on('fetch:events', function () {
    git.events().then(handleEvents);
  });

  function handleRepos (repos) {
    subspace.emit('repos', repos);
  }

  function handleCommits (repo, commitData) {
    var chronologicalCommits = commitData.reverse(),
        commitHandler = _.partial(handleCommit, repo);

    var i = setInterval(function () {
      var commit = chronologicalCommits.shift();
      if (commit) git.commit(repo, commit.sha).then(commitHandler);
      else clearInterval(i);
    }, 5e3);
  }

  function handleCommit (repo, commit) {
    subspace.emit('commit', commit, repo);
  }

  function handleRepo (repoData) {
    subspace.emit('repo', repoData);
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
          if (commit) git.commit(commit.repo, commit.sha).then(_.partial(handleCommit, commit.repo));
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
