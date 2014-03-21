var raf = require('raf-component');

module.exports = function () {
  var locations = {},
      orbits = {};

  return function orbitShip (animation, renderer, login, planet, next) {
    var planetPos = renderer.planetPosition(planet),
        y = 0;

    loop();

    function loop () {
      if (y < 25000 && (y += (25000 / 120))) renderer.moveShip(login, planetPos.x, planetPos.y + y, planetPos.z); // 120 frames
      raf(loop);
    }
    // console.log(raf);
    // if (planet === locations[login]) return next();
    // if (orbits[login]) orbits[login].stop();

    // locations[login] = planet;
    // var planetPos = renderer.planetPosition(planet),
    //     moveTo = animation.tween(
    //       { x: planetPos.x, y: planetPos.y + 25000, z: planetPos.z },
    //       { x: planetPos.x, y: planetPos.y, z: planetPos.z }, 6e3, function () {
    //         renderer.moveShip(login, this.x, this.y, this.z);
    //       },
    //       function () {
    //         log('Ship ' + login + ' orbiting ' + planet);
    //         animation.wait(5e3, next);
    //       }
    //     );

    // var orbit = orbits[login] = animation.tween(
    //   { z: 0 },
    //   { z: -Math.PI * 2 }, 64e3,
    //   function () {
    //     renderer.rotateShip(login, 0, 0, this.z);
    //   }
    // ).repeat(Number.POSITIVE_INFINITY);

    // moveTo.chain(orbit);
    // moveTo.start();
  };
};
