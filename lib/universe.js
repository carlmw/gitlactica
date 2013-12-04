var moment = require('moment'),
    fileRE = /\.?[^\.]*$/,
    orbitingShips = [];

module.exports = function (subspace, colour, effectsQueue, renderer) {
  subspace.on('repo', handleRepo);
  subspace.on('commit', handleCommit);

  function handleRepo (repoData) {
    effectsQueue.push('addPlanet', repoData.full_name, colour.of(repoData.language));
    effectsQueue.push('movePlanet', repoData.full_name, 0, 0, 0);
    effectsQueue.push('revealPlanet', repoData.full_name);
    effectsQueue.push('fadeInPlanetName');
  }

  function handleCommit (commitData) {
    var login = commitData.committer.login;

    if (orbitingShips.indexOf(login) === -1) {
      orbitingShips.push(login);
      effectsQueue.push('addShip', login);
      effectsQueue.push('orbitShip', login, 0, 0, 0);
    }

    commitData.files.forEach(function (file) {
      var fileColour = colour.of(file.filename.match(fileRE)[0]);
      effectsQueue.push('fireWeapons', login, fileColour, file.additions, file.deletions);
    });
  }
};
