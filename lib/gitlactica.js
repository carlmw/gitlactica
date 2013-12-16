(function () {
var global = require('./util').global(),
    transport = require('adapters/transport'),
    animation = require('adapters/animation'),
    github = require('../lib/github'),
    Subspace = require('./subspace_channel'),
    universe = require('./universe'),
    network = require('./network'),
    colours = require('../colours.json'),
    colour = require('../lib/colour')(colours),
    effects = require('./effects'),
    effectsQueue = require('./effects_queue'),
    router = require('./router');

module.exports = function (renderer, domContainer) {
  var canvas = renderer(),
      channel = new Subspace(),
      git = github(transport, channel),
      queue = effectsQueue(effects, animation, canvas);

  domContainer.appendChild(canvas.domCanvas);
  global.addEventListener('resize', resize);
  resize();
  universe(channel, colour, queue);
  network(channel, git);
  router(channel, global.document.getElementById('ui'), global.location.pathname);
  canvas.render();

  function resize () {
    canvas.setSize(global.innerWidth, global.innerHeight);
    log('Set canvas size ' + global.innerWidth + 'x' + global.innerHeight);
  }
};

})();
