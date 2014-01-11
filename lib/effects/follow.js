module.exports = function () {
  var activeName,
      posFn,
      rendering = false;

  return function followShip (animation, renderer, type, name, next) {
    activeName = name;
    
    if ('ship' === type) posFn = renderer.shipWorldPosition;
    else if ('planet' === type) posFn = renderer.planetPosition;
    else throw new Error('Unexpected object type "' + type + '"');

    if (!rendering) {
      rendering = true;
      update(renderer);
    }
    log('Following ' + type + ' ' + name);
    next();

    function update () {
      animation.raf(update);

      var pos = posFn(activeName);
      renderer.lookTo(pos.x, pos.y, pos.z, 0.01);
    }
  };
};
