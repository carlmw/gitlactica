var THREE = require('three'),
    tex = THREE.ImageUtils.loadTexture("textures/beam.png");

module.exports = beam;

function beam () {
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 6);

  var mat = new THREE.MeshBasicMaterial({
        color: 0x00FFFC,
        map: tex,
        blending: THREE.AdditiveBlending,
        transparent: true
      }),
      geo = new THREE.CylinderGeometry(20, 20, 5000, 20, 20, false);
  var mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.setZ(Math.PI * 1.5);
  mesh.translateY(2500);
  return mesh;
}
