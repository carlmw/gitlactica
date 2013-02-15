var Ship = require('./ship'),
    Planet = require('./planet'),
    global = require('./util').global();

module.exports = function (scene) {
  "use strict";
  
  var ship = new Ship(scene),
      planet1 = new Planet(scene),
      planet2 = new Planet(scene);

  planet1.mesh.position.x -= 6000;
  planet1.mesh.position.y -= 3000;
  planet2.mesh.position.x += 6000;
  planet2.mesh.position.y += 3000;

  ship.orbit(planet2);
  ship.pewpewpew(10);
  ship.extract(10);

  global.setTimeout(function () {
    ship.orbit(planet1);
  }, 5000);
};
