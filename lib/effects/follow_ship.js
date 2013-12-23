module.exports = function () {
  var activeShip,
      rendering = false;

  return function followShip (animation, renderer, login, next) {
    activeShip = login;

    if (!rendering) {
      rendering = true;
      update(renderer);
    }
    log('Following ship ' + login);
    next();

    function update () {
      animation.raf(update);

      var pos = renderer.shipWorldPosition(activeShip);
      renderer.lookTo(pos.x, pos.y, pos.z, 0.01);
    }
  };
};
