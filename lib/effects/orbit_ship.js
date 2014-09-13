module.exports = function () {
  var locations = {},
      ONE_ORBIT = Math.PI * 2;

  return function orbitShip (animation, renderer, login, planet, next) {
    if (planet === locations[login]) return next();

    // TODO maintain locations elsewhere
    locations[login] = planet;
    var z = ONE_ORBIT;

    animation.registerUpdater(login, function (delta) {
      renderer.rotateShip(
        login, 0, 0, z
      );
      z -= (delta * 0.0001);

      // Clamp
      if (z > ONE_ORBIT) z += ONE_ORBIT;
    });

    animation.wait(2e3, next);
  };
};
