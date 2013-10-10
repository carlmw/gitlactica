var moment = require('moment');

module.exports = function (subspace, renderer) {
  subspace.on('repo', handleRepo);

  function handleRepo (repoData) {
    renderer.addPlanet(repoData.full_name, 0xffffff);
    renderer.movePlanet(repoData.full_name, 0, 0, 0);
    renderer.lookAt(0, 0, 0);
  }
};
