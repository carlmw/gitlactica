module.exports = function () {
  var locations = {};

  return function hyperJump(animation, renderer, login, planet, next) {
    if (planet === locations[login]) return next();

    // Reset ship rotation
    renderer.rotateShip(login, 0, 0, 0);
    locations[login] = planet;
    var planetPos = renderer.planetPosition(planet),
        y = 25000;

    animation.registerUpdater(login, function (delta) {
      // You have reached your destination
      if (y < 0) return next();

      renderer.moveShip(
        login, planetPos.x, planetPos.y + y, planetPos.z
      );
      y -= (delta * 10);
      console.log(y);
    });
  };
};
