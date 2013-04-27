var window = require('./lib/util').global();

global.addEventListener('load', function () {
  require('./lib/gitlactica')(window.document.body);
});
