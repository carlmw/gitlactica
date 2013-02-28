var global = require('./util').global(),
    THREE = require('three'),
    config = require('../config').label,
    ctx;

module.exports = label;

function label (text) {
  var context = getContext(),
      data,
      texture,
      dimensions = context.measureText(text),
      material,
      geometry = new THREE.PlaneGeometry(dimensions.width, config.height, 1, 1);

  context.fillText(text, 0, config.height * 0.5, config.width);
  data = context.getImageData(0, 0, dimensions.width, config.height);
  texture = new THREE.DataTexture(data, config.width, config.height, THREE.RGBFormat);
  material = new THREE.MeshLambertMaterial({
    map: texture
  });

  return new THREE.Mesh(geometry, material);
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
