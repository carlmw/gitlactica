var moment = require('moment'),
    fileRE = /\.?[^\.]*$/;

module.exports = function (subspace, colour, effectsQueue, renderer) {
  subspace.on('commit', handleCommit);

  function handleCommit (commitData, repoData) {
    var login = commitData.committer.login,
        repo = repoData.full_name,
        q = effectsQueue();

    q.push('addPlanet', repo, colour.of(repoData.language));
    q.push('follow', 'planet', repo);
    q.push('repoDetails', repo);
    q.push('addShip', login);
    q.push('follow', 'ship', login);
    q.push('orbitShip', login, repo);
    q.push('commitDetails', login, commitData.commit.message, commitData.committer.avatar_url);
    q.push('chase', login);
    q.push('follow', 'planet', repo);

    commitData.files.forEach(function (file) {
      var fileColour = colour.of(file.filename.match(fileRE)[0]);
      if (file.changes > 10) q.push('fireChangeBomb', login, repo, fileColour);
      else q.push('fireWeapons', login, repo, fileColour, file.additions, file.deletions);
    });
    q.push('nextCommit');
  }
};
