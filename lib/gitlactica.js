var global = require('./util').global(),
    transport = require('adapters/transport'),
    config = require('../config'),
    github = require('../lib/github'),
    Subspace = require('./subspace_channel'),
    universe = require('./universe'),
    network = require('./network');

module.exports = function (renderer, domContainer) {
  var canvas = renderer(config),
      channel = new Subspace(),
      git = github(transport, channel),
      repo = global.location.hash.substr(2);
  domContainer.appendChild(canvas.domCanvas);
  global.addEventListener('resize', resize);

  resize();

  universe(channel, canvas);
  network(repo, channel, git);
  function resize () {
    canvas.setSize(global.innerWidth, global.innerHeight);
  }

  canvas.render();
};
