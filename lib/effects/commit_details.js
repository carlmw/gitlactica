var templates = require('../templates');

module.exports = function commitDetails (animation, renderer, login, message, avatarUrl, next) {
  renderer.document.getElementById('current-commit').innerHTML = templates.commit_details({
    login: login,
    message: message,
    avatarUrl: avatarUrl
  });
  next();
};
