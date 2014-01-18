var moment = require('moment'),
    fileRE = /\.?[^\.]*$/,
    orbitingShips = [];

module.exports = function (subspace, colour, effectsQueue, renderer) {
  subspace.on('commit', handleCommit);

  // TODO remove duplication
  function handleCommit (commitData, repoData) {
    var login = commitData.committer.login,
        repo = repoData.full_name;

    effectsQueue.push('addPlanet', repo, colour.of(repoData.language));
    effectsQueue.push('follow', 'planet', repo);
    effectsQueue.push('repoDetails', repo);

    if (orbitingShips.indexOf(login) === -1) {
      orbitingShips.push(login);
      effectsQueue.push('addShip', login);
      effectsQueue.push('follow', 'ship', login);
      effectsQueue.push('orbitShip', login, repo);
    } else {
      effectsQueue.push('follow', 'ship', login);
    }
    effectsQueue.push('commitDetails', login, commitData.commit.message, commitData.committer.avatar_url);
    effectsQueue.push('chase', login);
    effectsQueue.push('follow', 'planet', repo);

    commitData.files.forEach(function (file) {
      var fileColour = colour.of(file.filename.match(fileRE)[0]);
      effectsQueue.push('fireWeapons', login, repo, fileColour, file.additions, file.deletions);
    });
  }
};
