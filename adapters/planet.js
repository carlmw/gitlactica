var THREE = require('three'),
    texture = THREE.ImageUtils.loadTexture('/textures/planet.jpg'),
    geometry = new THREE.SphereGeometry(1000, 128, 128),
    materials = {};

module.exports = Planet;

function Planet(name, colour) {
  var pivot = new THREE.Object3D(),
      mesh = new THREE.Mesh(geometry, selectMaterial(colour));

  pivot.add(mesh);

  this.mesh = mesh;
  this.pivot = pivot;
}

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
    map: texture
  });
}
