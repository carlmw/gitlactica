var moment = require('moment');

module.exports = function (subspace, effectsQueue, renderer) {
  subspace.on('repo', handleRepo);
  subspace.on('commit', handleCommit);

  function handleRepo (repoData) {
    renderer.addPlanet(repoData.full_name, 0xffffff);
    renderer.movePlanet(repoData.full_name, 0, 0, 0);
    renderer.lookAt(0, 0, 0);
  }

  function handleCommit (commitData) {
    var login = commitData.committer.login;
    effectsQueue.push('addShip', login);
    effectsQueue.push('orbitShip', login, 0, 0, 0);
    commitData.files.forEach(function (file) {
      effectsQueue.push('fireWeapons', login, 0x0000ff, file.additions, file.deletions);
    });
  }
};
