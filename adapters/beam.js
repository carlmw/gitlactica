var THREE = require('three'),
    tex = THREE.ImageUtils.loadTexture("/textures/beam.png");

module.exports = beam;

function beam () {
  var mat = new THREE.MeshBasicMaterial({
        color: 0x00FFFC,
        map: tex,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.25
      }),
      geo = new THREE.PlaneGeometry(40, 5000, 1, 1),
      mesh = new THREE.Mesh(geo, mat);
  mesh.doubleSided = true;
  mesh.rotation.z = Math.PI * 1.5;
  mesh.translateY(2500);

  return mesh;
}
