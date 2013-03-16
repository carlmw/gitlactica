var Client = require('./client'),
    ShipYard = require('./ship_yard'),
    System = require('./system'),
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
    var logins = data.committers.map(collectLogin);
    yard.commision(logins);

    logins.forEach(dispatchShip, { yard: yard, repo: data.repo });
  });

  client.on('open', function () {
    client.send('login', { login: config.github.username });
  });

  client.on('complexity', function (data) {
    system.reform(data.repo, data.complexity);
  });

  keyboardNavigation(subspace);
};

function collectName(repo) {
  return repo.full_name;
}

function collectLogin(committer) {
  return committer.login;
}

function dispatchShip(login) {
  this.yard.dispatch(login, this.repo);
}
