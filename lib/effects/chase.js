module.exports = function () {
  var activeShip,
      rendering = false;

  return function chase (animation, renderer, login, next) {
    activeShip = login;

    if (!rendering) {
      rendering = true;
      update(renderer);
    }
    log('Chasing ship ' + login);
    next();

    function update () {
      animation.raf(update);

      var pos = renderer.shipChasePosition(activeShip);
      renderer.moveCamera(pos.x + 500, pos.y, pos.z, 0.01);
    }
  };
};
