(function () {
  var util = require('./lib/util'),
      document = util.document(),
      window = util.global();

  window.log = function (msg) {
    console.log(msg);
  };

  var renderer = require('adapters/renderer'),
      gitlactica = require('./lib/gitlactica'),
      domContainer = document.getElementById('canvas-wrapper'),
      Subspace = require('./lib/subspace_channel'),
      colour = require('./lib/colour')(require('./colours.json')),
      channel = new Subspace(),
      canvas = renderer(channel);

  domContainer.appendChild(canvas.domCanvas);
  window.addEventListener('resize', resize);
  resize();
  canvas.render();

  require('./lib/demo_mode')(canvas, colour, canvas.THREE);

  function resize () {
    canvas.setSize(window.innerWidth, window.innerHeight);
  }
})();
