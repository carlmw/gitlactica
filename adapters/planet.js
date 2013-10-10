var THREE = require('three'),
    TWEEN = require('tween.js'),
    config = require('../config'),
    texture = THREE.ImageUtils.loadTexture('/textures/planet.jpg'),
    geometry = new THREE.SphereGeometry(400, 32, 32),
    materials = {};

module.exports = Planet;

function Planet(name, colour) {
  var pivot = new THREE.Object3D(),
      mesh = new THREE.Mesh(geometry, selectMaterial(colour));

  pivot.add(mesh);

  this.name = name;
  this.mesh = mesh;
  this.pivot = pivot;

  rotate(mesh);
}

Planet.prototype.toString = function () {
  return '[Planet ' + this.name + ']';
};

function selectMaterial(colour) {
  if (materials[colour]) {
    return materials[colour];
  }
  materials[colour] = generateMaterial(colour);
  return materials[colour];
}

function generateMaterial(color) {
  return new THREE.MeshPhongMaterial({
    color: color,
    bumpMap: texture,
    map: texture,
    bumpScale: 10,
    perPixel: true
  });
}

function rotate(mesh) {
  new TWEEN.Tween(mesh.rotation)
    .to({ z: Math.PI * 2 }, 64e3)
    .repeat(Number.POSITIVE_INFINITY)
    .start();
}
