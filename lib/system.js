define(['ship', 'planet', 'course'], function (Ship, Planet, course) {

  return function (scene) {

    var ship = new Ship(scene),
        planet1 = new Planet(scene),
        planet2 = new Planet(scene);

    planet1.mesh.position.x -= 3000;
    planet2.mesh.position.x += 3000;

    ship.orbit(planet1);

    setTimeout(function () {
      ship.orbit(planet2);
    }, 4e3);
  };
});
