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
      mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);

  this.mesh = mesh;

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
