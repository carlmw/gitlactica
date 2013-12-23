var document = require('../util').document();

module.exports = function (animation, renderer, name, next) {
  log('Revealed planet');
  renderer.lookTo(0, 1500, 0, 0.01);

  animation.wait(function () {
    renderer.document.querySelector('.repo').className += ' visible';
    log('Revealed repo name');
  }, 0);

  animation.wait(function () {
    renderer.moveCamera(6000, -4000, 1000, 0.01);
    renderer.lookTo(0, 0, 0, 0.01);
    log('Moved camera away from planet');
  }, 6e3);

  animation.wait(next, 12e3);
};
