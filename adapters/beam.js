var THREE = require('three'),
    tex = THREE.ImageUtils.loadTexture("/textures/beam.png");

module.exports = beam;

function beam () {
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 12);

  var mat = new THREE.MeshBasicMaterial({
        color: 0x00FFFC,
        map: tex,
        blending: THREE.AdditiveBlending,
        transparent: true
      }),
      geo = new THREE.CylinderGeometry(10, 10, 5000, 10, 10, false);
  var mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.setZ(Math.PI * 1.5);
  mesh.translateY(2500);

  return mesh;
}
