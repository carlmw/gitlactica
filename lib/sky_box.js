var THREE = require('three');

module.exports = function skyBox (scene, texture) {
  var mesh,
      tex = new THREE.ImageUtils.loadTexture(texture),
      material = new THREE.MeshLambertMaterial({
        map: tex,
        depthWrite: false,
        side: THREE.BackSide
      }),
      geometry = new THREE.CubeGeometry(
        4194304, 4194304, 4194304, 1, 1, 1, null, true
      ),
      faceMaterial = new THREE.MeshFaceMaterial([
        material, material, material,
        material, material, material
      ]);

  tex.wrapT = tex.wrapS = THREE.RepeatWrapping;
  tex.repeat.x = 2;
  tex.repeat.y = 2;

  mesh = new THREE.Mesh(geometry, faceMaterial);

  scene.add(mesh);
};
