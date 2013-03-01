var THREE = require('three'),
    TWEEN = require('tween'),
    shaders = require('./shaders'),
    config = require('../config'),
    label = require('./label'),
    materials = {
      unknown: generateMaterial(config.languages.Unknown.texture)
    };

module.exports = Planet;

function Planet (scene, name, language) {
  var geometry = new THREE.SphereGeometry(400, 40, 30),
      pivot = new THREE.Object3D(),
      nameLabel = label(name),
      mesh = new THREE.Mesh(geometry, selectMaterial(language));

  pivot.add(mesh);
  pivot.add(nameLabel);
  scene.add(pivot);

  this.name = name;
  this.mesh = mesh;
  this.pivot = pivot;

  rotate(mesh);
}

Planet.prototype.toString = function () {
  return '[Planet: ' + this.name + ']';
};

Planet.prototype.scale = function (factor) {
  this.mesh.scale.set(factor, factor, factor);
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
