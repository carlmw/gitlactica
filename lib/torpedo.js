define(['vendor/three', 'shaders'], function (THREE, shaders) {
  var material = new THREE.ShaderMaterial({
        uniforms: shaders.uniforms,
        vertexShader: shaders.vertex.both,
        fragmentShader: shaders.fragment.ship
      });

  return function () {
    var geometry = new THREE.SphereGeometry(25, 20, 15),
        mesh = new THREE.Mesh(geometry, material);

    return mesh;
  };
});
