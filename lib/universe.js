var moment = require('moment'),
    fileRE = /\.?[^\.]*$/;

module.exports = function (subspace, colour, effectsQueue, renderer) {
  subspace.on('commit', handleCommit);

  // TODO remove duplication
  function handleCommit (commitData, repoData) {
    var login = commitData.committer.login,
        repo = repoData.full_name;

    effectsQueue.push('addPlanet', repo, colour.of(repoData.language));
    effectsQueue.push('follow', 'planet', repo);
    effectsQueue.push('repoDetails', repo);
    effectsQueue.push('addShip', login);
    effectsQueue.push('follow', 'ship', login);
    effectsQueue.push('orbitShip', login, repo);
    effectsQueue.push('commitDetails', login, commitData.commit.message, commitData.committer.avatar_url);
    effectsQueue.push('chase', login);
    effectsQueue.push('follow', 'planet', repo);

    commitData.files.forEach(function (file) {
      var fileColour = colour.of(file.filename.match(fileRE)[0]);
      effectsQueue.push('fireWeapons', login, repo, fileColour, file.additions, file.deletions);
    });
  }
};
