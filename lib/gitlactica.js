var global = require('./util').global(),
    transport = require('adapters/transport'),
    config = require('../config'),
    github = require('../lib/github'),
    Subspace = require('./subspace_channel'),
    universe = require('./universe');

module.exports = function (renderer, domContainer) {
  var canvas = renderer(config),
      channel = new Subspace(),
      repo = global.location.hash.substr(2);
  domContainer.appendChild(canvas.domCanvas);
  global.addEventListener('resize', resize);

  resize();

  universe(repo, github(transport, channel), channel, canvas);

  function resize () {
    canvas.setSize(global.innerWidth, global.innerHeight);
  }

  canvas.render();
};
