var THREE = require('three');

module.exports = skyBox;

function skyBox(scene, texture) {
  var mesh,
      tex = new THREE.ImageUtils.loadTexture(texture),
      material,
      geometry,
      faceMaterial;

  geometry = new THREE.CubeGeometry(4194304, 4194304, 4194304, 1, 1, 1, null, true),
  material = new THREE.MeshLambertMaterial({
    map: tex,
    depthWrite: false,
    side: THREE.BackSide
  });
  faceMaterial = new THREE.MeshFaceMaterial([
    material, material, material,
    material, material, material
  ]);

  tex.wrapT = tex.wrapS = THREE.RepeatWrapping;
  tex.repeat.x = 7;
  tex.repeat.y = 7;

  mesh = new THREE.Mesh(geometry, faceMaterial);

  scene.add(mesh);
}