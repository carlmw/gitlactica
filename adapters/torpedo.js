var THREE = require('three'),
    material = new THREE.ParticleBasicMaterial({
      color: 0xff0040,
      size: 400,
      map: THREE.ImageUtils.loadTexture('textures/torpedo.png'),
      transparent: true,
      blending: THREE.AdditiveBlending
    });

module.exports = Torpedo;

function Torpedo() {
  var geo = new THREE.Geometry();
  geo.vertices.push(new THREE.Vector3(0, 0, 0));
  this.particle = new THREE.ParticleSystem(geo, material);
}
