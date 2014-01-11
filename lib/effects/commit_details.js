var templates = require('../templates');

module.exports = function commitDetails (animation, renderer, login, message, avatarUrl, next) {
  var html = templates.commit_details({
    login: login,
    message: message.length > 200 ? message.substr(0, 200) + '...' : message,
    avatarUrl: avatarUrl
  });
  renderer.html('#current-commit', html);
  next();
};
