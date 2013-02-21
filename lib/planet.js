var THREE = require('three'),
    TWEEN = require('tween'),
    shaders = require('./shaders'),
    config = require('../config'),
    materials = {
      unknown: generateMaterial(config.languages.Unknown.texture)
    };

module.exports = Planet;

function Planet (scene, repo) {
  var geometry = new THREE.SphereGeometry(400, 40, 30),
      pivot = new THREE.Object3D(),
      mesh = new THREE.Mesh(geometry, selectMaterial(repo.language));

  pivot.add(mesh);
  scene.add(pivot);

  this.name = repo.full_name;
  this.mesh = mesh;
  this.pivot = pivot;

  rotate(mesh);
}

Planet.prototype.toString = function () {
  return '[Planet: ' + this.name + ']';
};

function rotate (mesh) {
  var tween = new TWEEN.Tween(mesh.rotation)
        .to({ y: Math.PI * 2 }, 16e3)
        .onComplete(function () {
          mesh.rotation.y = 0;
          tween.start();
        });

  tween.start();
}

function selectMaterial (language) {
  if (materials[language]) {
    return materials[language];
  }

  if (config.languages[language]) {
    materials[language] = generateMaterial(config.languages[language].texture);
    return materials[language];
  }

  return materials.unknown;
}

function generateMaterial (texture) {
  return new THREE.ShaderMaterial({
    uniforms: generateUniforms(texture),
    vertexShader: shaders.planet.vertex,
    fragmentShader: shaders.planet.fragment
  });
}

function generateUniforms (texture) {
  return {
    planet: {
      type: 't',
      value: THREE.ImageUtils.loadTexture(texture)
    }
  };
}