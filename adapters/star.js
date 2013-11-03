var THREE = require('three');

module.exports = function Star (scene) {
  var geometry = new THREE.SphereGeometry(1600, 32, 32),
      material = new THREE.MeshBasicMaterial({
        color: 0xfff693,
        map: THREE.ImageUtils.loadTexture('/textures/star.jpg')
      }),
      mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);
};
