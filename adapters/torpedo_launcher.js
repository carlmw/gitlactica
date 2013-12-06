var _ = require('lodash'),
    THREE = require('three'),
    INF = Number.POSITIVE_INFINITY,
    PARTICLE_COUNT = 60;

module.exports = function (scene) {
  var system = generateSystem(),
      geo = system.geometry,
      i = 0,
      projectiles = [];

  return { add: add, move: move, system: system };

  function move (i, x, y, z) {
    geo.vertices[i].set(x, y, z);
    geo.verticesNeedUpdate = true;
  }

  function add (colourHex) {
    if (i > PARTICLE_COUNT) {
      i = 0;
    }
    var position = geo.vertices[i],
        color = geo.colors[i];

    color.setHex(colourHex);
    geo.colorsNeedUpdate = true;
    i++;
    log('Launched torpedo with colour 0x' + colourHex.toString(16));

    return i - 1;
  }
};

function generateSystem () {
  var geo = new THREE.Geometry(),
      material = generateMaterial();

  // Generate a stack of torpedoes for use later
  _.times(PARTICLE_COUNT, function () {
    geo.vertices.push(new THREE.Vector3(INF, INF, INF));
    geo.colors.push(new THREE.Color(0xffffff));
  });
  var system = new THREE.ParticleSystem(geo, material);
  system.sortParticles = true;
  return system;
}

function generateMaterial () {
  return new THREE.ParticleBasicMaterial({
    size: 250,
    map: THREE.ImageUtils.loadTexture('/textures/torpedo.png'),
    transparent: true,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    depthWrite: false
  });
}
