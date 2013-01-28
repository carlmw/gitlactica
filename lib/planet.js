define(['vendor/three', 'shaders'], function (THREE, shaders) {
  "use strict";

  return function (scene) {
    var geometry = new THREE.SphereGeometry(400, 40, 30),
        material = new THREE.ShaderMaterial({
          uniforms: shaders.uniforms,
          vertexShader: shaders.vertex.both,
          fragmentShader: shaders.fragment.planet
        }),
        mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    this.mesh = mesh;
  };
});
