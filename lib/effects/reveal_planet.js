var document = require('../util').document();

module.exports = function (animation, renderer, name, next) {
	log('Revealed planet');
  renderer.lookTo(0, 1500, 0);

  setTimeout(function () {
    document.querySelector('.repo').className += ' visible';
    log('Revealed repo name');
  }, 0);

  setTimeout(function () {
    renderer.moveCamera(6000, -4000, 1000);
    renderer.lookTo(0, 0, 0);
    log('Moved camera away from planet');
  }, 6e3);

  setTimeout(next, 12e3);
};
