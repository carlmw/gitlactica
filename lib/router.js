var window = require('./util').global(),
    _ = require('lodash'),
    templates = require('./templates'),
    renderTemplate = require('./render_template'),
    crossroads = require('crossroads');

module.exports = function (subspace, el, pathName) {
  var renderer = renderTemplate(templates, el),
      curriedRenderer = _.curry(renderer);

  subspace.on('repos', curriedRenderer('/repos'));
  subspace.on('repo', curriedRenderer('/repo'));
  crossroads.addRoute(/\/repos\/([^\/]+\/[^\/]+)/, function (repo) {
    subspace.emit('fetch:repo', repo);
  });
  crossroads.addRoute('/repos', function () {
    subspace.emit('fetch:repos');
  });
  crossroads.addRoute('/', renderer);

  crossroads.parse(pathName);
};

