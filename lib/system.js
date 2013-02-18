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
    var names = data.repos.map(collectName),
        planets = names.map(addOne),
        allocator = new OrbitAllocator(planets);

    allocator.allocate(planets);
  });

  client.on('open', function () {
    client.send('login', { login: 'carlmw' });
  });

  function addOne(name) {
    return new Planet(scene, name);
  }
};

function collectName(repo) {
  return repo.name;
}
