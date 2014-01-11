var THREE = require('three');

module.exports = function beam (texture) {
  var mat = new THREE.MeshBasicMaterial({
        color: 0x00FFFC,
        map: texture,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.25
      }),
      geo = new THREE.PlaneGeometry(100, 5000, 1, 1),
      mesh = new THREE.Mesh(geo, mat);
  mesh.doubleSided = true;
  mesh.rotation.z = Math.PI * 1.5;
  mesh.translateY(2575);

  return mesh;
};
