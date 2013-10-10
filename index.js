(function () {
var util = require('./lib/util'),
    document = util.document(),
    global = util.global(),
    renderer = require('adapters/renderer'),
    gitlactica = require('./lib/gitlactica'),
    domWrapper = document.getElementById('canvas-wrapper');

global.log = function (msg) {
  global.log.messages.push(msg);
  console.log(msg);
};
global.log.messages = [];

gitlactica(renderer, domWrapper);
})();
