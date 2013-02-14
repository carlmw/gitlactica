var THREE = require('three'),
    shaders = require('./shaders'),
    material = new THREE.ShaderMaterial({
      uniforms: shaders.uniforms,
      vertexShader: shaders.vertex.both,
      fragmentShader: shaders.fragment.ship
    });

module.exports = function torpedo () {
  var geometry = new THREE.SphereGeometry(25, 20, 15),
      mesh = new THREE.Mesh(geometry, material);

  return mesh;
};
