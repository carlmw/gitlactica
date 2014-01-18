var window = require('./util').global(),
    _ = require('lodash'),
    templates = require('./templates'),
    renderTemplate = require('./render_template'),
    crossroads = require('crossroads');

module.exports = function (subspace, el, pathName) {
  var renderer = renderTemplate(templates, el),
      curriedRenderer = _.curry(renderer);

  crossroads.addRoute('/playback', function () {
    subspace.emit('fetch:events');
  });
  crossroads.addRoute('/', function () {
    renderer('root');
  });

  renderer('loading');

  subspace.on('renderer:ready', function () {
    crossroads.parse(pathName);
  });

  subspace.on('failure', function (err) {
    renderer('whoops', { message: err });
  });
};
