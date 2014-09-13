module.exports = function chase (animation, renderer, login, next) {
  log('Chasing ship ' + login);

  animation.registerUpdater('camera/chase', update);
  next();

  function update () {
    var pos = renderer.shipChasePosition(login);
    renderer.moveCamera(pos.x + 500, pos.y, pos.z, 1);
  }
};
