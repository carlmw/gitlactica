define(['vendor/three', 'shaders'], function(THREE, shaders) {
  "use strict";

  return function (scene) {
    var geometry = new THREE.CubeGeometry(50, 100, 50),
        material = new THREE.ShaderMaterial({
          uniforms: shaders.uniforms,
          vertexShader: shaders.vertex.both,
          fragmentShader: shaders.fragment.ship
        }),
        mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(250, 0, 0);
    scene.add(mesh);

    this.mesh = mesh;
  };
});
