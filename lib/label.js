var global = require('./util').global(),
    THREE = require('three'),
    config = require('../config').label,
    ctx;

module.exports = label;

function label (text) {
  var context = getContext(),
      data,
      dimensions = context.measureText(text);

  context.fillText(text, 0, config.height * 0.5, config.width);
  data = context.getImageData(0, 0, dimensions.width, config.height);

  return new THREE.DataTexture(data, config.width, config.height, THREE.RGBFormat);
}

function getContext () {
  var canvas;
  
  if (!ctx) {
    canvas = global.document.createElement('canvas');
    canvas.width = config.width;
    canvas.height = config.height;

    ctx = canvas.getContext('2d');
    ctx.font = config.font;
    ctx.fillStyle = config.fillStyle;
  }

  ctx.clearRect(0, 0, config.width, config.height);

  return ctx;
}
