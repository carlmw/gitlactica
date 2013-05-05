var Client = require('./client'),
    ShipYard = require('./ship_yard'),
    System = require('./system'),
    placeholderPlanet = require('./placeholder_planet'),
    CameraController = require('./camera_controller'),
    SubspaceChannel = require('./subspace_channel'),
    keyboardNavigation = require('./keyboard_navigation'),
    HUD = require('./hud'),
    config = require('../config');

module.exports = function (scene, camera) {
  "use strict";

  var client = new Client(config.host),
      subspace = new SubspaceChannel(),
      cameraController = new CameraController(camera, subspace),
      hud = new HUD(subspace),
      system = new System(scene, subspace),
      yard = new ShipYard(scene, subspace);

  client.on('repos', function (data) {
    var repos = data.repos,
        names = repos.map(collectName);

    repos.forEach(system.form, system);
    system.layout();

    client.send('subscribe', { repos: names });
  });

  client.on('committers', function (data) {
    // var logins = data.committers.map(collectLogin);
    // yard.commision(logins);

    // logins.forEach(dispatchShip, { yard: yard, repo: data.repo });
  });

  client.on('open', function () {
    client.send('login', { login: config.github.username });
  });

  client.on('complexity', function (data) {
    system.reform(data.repo, data.complexity);
  });

  client.on('commits', function (data) {
    var commits = data.commits.map(function (commit) {
      return {
        login: commit.committer,
        input: fileCount(commit.added) + fileCount(commit.modified),
        output: fileCount(commit.removed) + fileCount(commit.modified)
      };
    });

    yard.dispatchFleet(data.repo, commits);
  });

  keyboardNavigation(subspace, client);
  hud.render();
  placeholderPlanet(scene, subspace);
};

function fileCount(files) {
  var prop, i = 0;
  for (prop in files) {
    i += files[prop].length;
  }
  return i;
}

function collectName(repo) {
  return repo.full_name;
}

function collectLogin(committer) {
  return committer.login;
}
