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
    effectsQueue = require('./effects_queue');

module.exports = function (renderer, domContainer) {
  var canvas = renderer(),
      channel = new Subspace(),
      git = github(transport, channel),
      effects = effectsQueue(animation, canvas),
      repo = global.location.hash.substr(2);

  domContainer.appendChild(canvas.domCanvas);
  global.addEventListener('resize', resize);
  resize();
  universe(channel, colour, effects);
  network(repo, channel, git);
  canvas.render();

  function resize () {
    canvas.setSize(global.innerWidth, global.innerHeight);
    log('Set canvas size ' + global.innerWidth + 'x' + global.innerHeight);
  }
};

})();