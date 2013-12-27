var templates = require('../templates');

module.exports = function commitDetails (animation, renderer, login, message, avatarUrl, next) {
  var html = templates.commit_details({
    login: login,
    message: message,
    avatarUrl: avatarUrl
  });
  renderer.html('#current-commit', html);
  next();
};
