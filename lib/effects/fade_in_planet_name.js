var document = require('../util').document();

module.exports = function (animation, renderer, next) {
  document.querySelector('.repo').className += ' visible';
  log('Revealed repo name');
  next();
};
