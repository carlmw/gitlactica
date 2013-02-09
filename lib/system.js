define(['ship', 'planet'], function (Ship, Planet) {
  "use strict";

  return function (scene) {

    var ship = new Ship(scene),
        planet1 = new Planet(scene),
        planet2 = new Planet(scene);

    planet1.mesh.position.x -= 7000;
    planet2.mesh.position.x += 7000;
    planet2.mesh.position.y += 2000;

    ship.orbit(planet1);
    ship.pewpewpew(10);
    ship.orbit(planet2);
  };
});
