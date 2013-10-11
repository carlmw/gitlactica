var global = require('./util').global(),
    transport = require('adapters/transport'),
    animation = require('adapters/animation'),
    config = require('../config'),
    github = require('../lib/github'),
    Subspace = require('./subspace_channel'),
    universe = require('./universe'),
    network = require('./network'),
    effectsQueue = require('./effects_queue');

module.exports = function (renderer, domContainer) {
  var canvas = renderer(config),
      channel = new Subspace(),
      git = github(transport, channel),
      effects = effectsQueue(animation, canvas),
      repo = global.location.hash.substr(2);

  domContainer.appendChild(canvas.domCanvas);
  global.addEventListener('resize', resize);
  resize();
  universe(channel, effects, canvas);
  network(repo, channel, git);
  canvas.render();

  function resize () {
    canvas.setSize(global.innerWidth, global.innerHeight);
  }
};
