var window = require('./util').global(),
    _ = require('lodash'),
    templates = require('./templates'),
    renderTemplate = require('./render_template'),
    crossroads = require('crossroads');

module.exports = function (subspace, el, pathName) {
  var renderer = renderTemplate(templates, el),
      curriedRenderer = _.curry(renderer);

  // TODO move crossroads routing into an adapter
  crossroads.addRoute(/\/repos\/([^\/]+\/[^\/]+)\/days\/(\d+)/, function (repo, days) {
    subspace.on('repo', curriedRenderer('playback'));
    subspace.on('repo', function () {
      subspace.emit('fetch:commits', repo, days);
    });
    subspace.emit('fetch:repo', repo);
  });
  crossroads.addRoute(/\/repos\/([^\/]+\/[^\/]+)/, function (repo) {
    renderer('pick_interval', { full_name: repo });
  });
  crossroads.addRoute('/repos', function () {
    subspace.on('repos', curriedRenderer('pick_repo'));
    subspace.emit('fetch:repos');
  });
  crossroads.addRoute('/', function () {
    renderer('root');
  });

  renderer('loading');

  subspace.on('renderer:ready', function () {
    crossroads.parse(pathName);
  });

  subspace.on('renderer:failed', function () {
    renderer('whoops');
  });
};
