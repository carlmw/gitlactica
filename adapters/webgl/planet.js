var THREE = require('three'),
    shaders = require('./shaders'),
    texture = THREE.ImageUtils.loadTexture('/textures/planet.png'),
    geometry = new THREE.SphereGeometry(1000, 128, 128),
    materials = {},
    atmosphereGeometry = geometry.clone(),
    atmosphereMaterial;

module.exports = Planet;

function Planet(name, colour, camera) {
  if (!atmosphereMaterial) {
    atmosphereMaterial = generateAtmosphereMaterial(camera);
  }

  var pivot = new THREE.Object3D(),
      mesh = new THREE.Mesh(geometry, selectMaterial(colour)),
      atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);

  atmosphereMesh.scale.multiplyScalar(1.05);

  pivot.add(mesh);
  pivot.add(atmosphereMesh);

  this.mesh = mesh;
  this.pivot = pivot;
}

function selectMaterial(colour) {
  if (materials[colour]) {
    return materials[colour];
  }
  materials[colour] = generateMaterial(colour);
  return materials[colour];
}

function generateMaterial(colour) {
  var emissive = new THREE.Color(colour),
      matColour = new THREE.Color(),
      hsl = emissive.getHSL();
  matColour.setHSL(hsl.h, 1, 1);
  emissive.setHSL(hsl.h, 1, hsl.l);

  return new THREE.MeshPhongMaterial({
    color: matColour,
    emissive: emissive,
    map: texture
  });
}

function generateAtmosphereMaterial (camera) {
  return new THREE.ShaderMaterial({
    uniforms: {
      c: { type: "f", value: 0.5 },
      p: { type: "f", value: 1 },
      alpha: { type: "f", value: 0.4 },
      glowColor: { type: "c", value: new THREE.Color(0x72A7E5) },
      viewVector: { type: "v3", value: camera.position }
    },
    vertexShader: shaders.glowVert,
    fragmentShader: shaders.glowFrag,
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
    transparent: true
  });
}
