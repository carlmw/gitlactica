var THREE = require('three');

module.exports = skyBox;

function skyBox(scene, texture) {
  var mesh,
      tex = new THREE.ImageUtils.loadTextureCube(texture),
      material,
      geometry;

  geometry = new THREE.CubeGeometry(4194304, 4194304, 4194304, 1, 1, 1, null, true);
  var shader = THREE.ShaderLib.cube;
  shader.uniforms.tCube.value = tex; // apply textures to shader

  // create shader material
  material = new THREE.ShaderMaterial( {
    fragmentShader: shader.fragmentShader,
    vertexShader: shader.vertexShader,
    uniforms: shader.uniforms,
    depthWrite: false,
    side: THREE.BackSide
  });

  mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);
}