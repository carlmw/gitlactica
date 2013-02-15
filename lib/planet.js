var THREE = require('three'),
    TWEEN = require('tween'),
    shaders = require('./shaders');

module.exports = function Planet (scene) {
  var geometry = new THREE.SphereGeometry(400, 40, 30),
      material = new THREE.ShaderMaterial({
        uniforms: shaders.uniforms,
        vertexShader: shaders.vertex.both,
        fragmentShader: shaders.fragment.planet
      }),
      pivot = new THREE.Object3D(),
      mesh = new THREE.Mesh(geometry, material);

  pivot.add(mesh);
  scene.add(pivot);

  this.mesh = mesh;
  this.pivot = pivot;
  
  rotate(mesh);
};

function rotate (mesh) {
  var tween = new TWEEN.Tween(mesh.rotation)
        .to({ z: Math.PI * 2 }, 16e3)
        .onComplete(function () {
          mesh.rotation.z = 0;
          tween.start();
        });

  tween.start();
}
