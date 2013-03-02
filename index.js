var global = require('./lib/util').global();

global.addEventListener('load', function () {
  require('./lib/gitlactica')(global.document.body);
});
