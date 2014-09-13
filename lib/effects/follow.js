module.exports = function follow (animation, renderer, type, name, next) {
  var posFn;
  if ('ship' === type) posFn = renderer.shipWorldPosition;
  else if ('planet' === type) posFn = renderer.planetPosition;
  else throw new Error('Unexpected object type "' + type + '"');

  log('Following ' + type + ' ' + name);
  animation.registerUpdater('camera/follow', update);
  next();

  function update () {
    var pos = posFn(name);
    renderer.lookTo(pos.x, pos.y, pos.z, 0.14);
  }
};
