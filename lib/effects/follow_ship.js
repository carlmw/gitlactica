var raf = require('raf-component'),
    activeShip,
    rendering = false;

module.exports = function (animation, renderer, login, next) {
  activeShip = login;

  if (!rendering) {
    rendering = true;
    update(renderer);
  }
  log('Following ship ' + login);
  next();

  function update () {
    raf(update);

    var pos = renderer.shipWorldPosition(activeShip);
    renderer.lookTo(pos.x, pos.y, pos.z);
  }
};
