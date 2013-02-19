var Ship = require('./ship'),
    Planet = require('./planet'),
    OrbitAllocator = require('./orbit_allocator'),
    Client = require('./client'),
    config = require('../config'),
    global = require('./util').global();

module.exports = function (scene) {
  "use strict";
  
  var client = new Client(config.host);

  client.on('repos', function (data) {
    var repos = data.repos.slice(0, 4),
        names = repos.map(collectName),
        planets = repos.map(addPlanet),
        allocator = new OrbitAllocator(planets);

    // client.send('subscribe', { repos: names });

    allocator.allocate(planets);

    var ship = new Ship(scene);

    ship.orbit(planets[0]);
    ship.orbit(planets[1]);
    ship.orbit(planets[2]);
    ship.orbit(planets[3]);
  });

  client.on('open', function () {
    client.send('login', { login: config.github.username });
  });

  function addPlanet(repo) {
    return new Planet(scene, repo);
  }
};

function collectName(repo) {
  return repo.full_name;
}
