var global = require('./util').global(),
    THREE = require('three'),
    config = require('../config').label,
    ctx;

module.exports = label;

function label (text) {
  text = text.toUpperCase();

  var context = getContext(),
      data,
      texture,
      dimensions = context.measureText(text),
      material,
      mesh,
      geometry = new THREE.PlaneGeometry(dimensions.width * 4, config.height * 4, 1, 1);

  context.fillText(text, 0, config.height * 0.5, config.width);
  data = new Uint8Array(context.getImageData(0, 0, dimensions.width, config.height).data.buffer);
  texture = new THREE.DataTexture(data, dimensions.width, config.height, THREE.RGBAFormat);
  texture.needsUpdate = true;

  material = new THREE.MeshBasicMaterial({
    transparent: true,
    map: texture
  });

  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, -1000, 0);

  return mesh;
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
