var Client = require('./client'),
    ShipYard = require('./ship_yard'),
    System = require('./system'),
    SubspaceChannel = require('./subspace_channel'),
    config = require('../config');

module.exports = function (scene) {
  "use strict";

  var client = new Client(config.host),
      subspace = new SubspaceChannel(),
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

    logins.forEach(function (login) {
      yard.dispatch(login, data.repo);
    });
  });

  client.on('open', function () {
    client.send('login', { login: config.github.username });
  });

  client.on('complexity', function (data) {
    system.reform(data.repo, data.complexity);
  });
};

function collectName (repo) {
  return repo.full_name;
}

function collectLogin (committer) {
  return committer.login;
}
