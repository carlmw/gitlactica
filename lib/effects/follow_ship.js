var animating,
    raf = require('raf-component'),
    targetShip;

module.exports = function (animation, renderer, name, next) {
  targetShip = name;

  function update () {
    var pos = renderer.shipWorldPosition(name);
    renderer.lookAt(pos.x, pos.y, pos.z);
    raf(update);
  }

  if (!animating) {
    animating = true;
    update();
  }

  log("Following ship " + name);
  next();
};
