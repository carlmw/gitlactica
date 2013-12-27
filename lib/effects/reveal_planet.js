module.exports = function (animation, renderer, next) {
  log('Revealed planet');
  renderer.lookTo(0, 1500, 0, 0.04);

  animation.wait(0, function () {
    renderer.addClass('.repo', 'visible');
    log('Revealed repo name');
  });

  animation.wait(6e3, function () {
    renderer.moveCamera(6000, -4000, 1000, 0.01);
    renderer.lookTo(0, 0, 0, 0.01);
    log('Moved camera away from planet');
  });

  animation.wait(12e3, next);
};
