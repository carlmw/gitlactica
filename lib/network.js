var moment = require('moment'),
    when = require('when'),
    _ = require('lodash');

module.exports = function network (subspace, git) {
  var alreadyPlayed = [];

  subspace.on('fetch:events', function (login) {
    git.events(login).then(handleEvents);
  });

  function handleCommitRepo (values) {
    subspace.emit('commit', values[0], values[1]);
  }

  function handleEvents (eventData) {
    var commits = _(eventData)
          .where({ type: 'PushEvent' })
          .map(prepareCommits)
          .flatten()
          .value();

    subspace.on('nextCommit', next);
    next();

    function next () {
      if (commits.length === 0) return;
      var commit;
      while (commit = commits.shift(), alreadyPlayed.indexOf(commit.sha) != -1);
      alreadyPlayed.push(commit.sha);
      when.join(
        git.commit(commit.repo, commit.sha),
        git.repo(commit.repo)
      ).then(handleCommitRepo, console.error);
    }
  }

  function prepareCommits (pushEvent) {
    return _.map(pushEvent.payload.commits, function (commit) {
      commit.repo = pushEvent.repo.name;
      return commit;
    });
  }
};
