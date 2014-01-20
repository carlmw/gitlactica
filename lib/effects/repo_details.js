var templates = require('../templates');

module.exports = function repoDetails (animation, renderer, repo, next) {
  var html = templates.repoDetails({ repo: repo });
  renderer.html('#ui', html);
  html = templates.repoDetails({ repo: repo, className: 'visible' });
  renderer.html('#ui', html);
  log('Rendered repo details for ' + repo);
  next();
};
