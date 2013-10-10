var global = require('./util').global(),
    config = require('../config'),
    Subspace = require('./subspace_channel'),
    universe = require('./universe'),
    raf = require('raf-component');

module.exports = function (renderer, domContainer) {
  var canvas = renderer(config),
      channel = new Subspace(),
      repo = global.location.hash.substr(2);
  domContainer.appendChild(canvas.domCanvas);
  global.addEventListener('resize', resize);

  resize();
  animate();

  universe(repo, channel);

  function resize () {
    canvas.setSize(global.innerWidth, global.innerHeight);
  }

  function animate () {
    raf(animate);
    canvas.render();
  }
};
