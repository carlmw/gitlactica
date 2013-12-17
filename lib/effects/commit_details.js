var templates = require('../templates'),
    document = require('../util').document();

module.exports = function (animation, renderer, login, message, avatarUrl, next) {
  document.getElementById('current-commit').innerHTML = templates.commit_details({
    login: login,
    message: message,
    avatarUrl: avatarUrl
  });

  next();
};
