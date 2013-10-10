module.exports = function (repo, github, subspace, renderer) {
  subspace.on('repo', renderPlanet);
  github.repo(repo, subspace);

  function renderPlanet (repoData) {
    renderer.addPlanet(repoData.full_name, 0xffffff);
    renderer.movePlanet(repoData.full_name, 0, 0, 0);
    renderer.lookAt(0, 0, 0);
  }
};
