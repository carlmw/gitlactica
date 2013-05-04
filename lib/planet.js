var THREE = require('three'),
    TWEEN = require('tween'),
    shaders = require('./shaders'),
    config = require('../config'),
    labelRE = /[^/]+$/,
    materials = { Unknown: generateMaterial(config.languages.Unknown.texture) };

module.exports = Planet;

function Planet(scene, name, language) {
  var geometry = new THREE.SphereGeometry(400, 16, 16),
      pivot = new THREE.Object3D(),
      mesh = new THREE.Mesh(geometry, selectMaterial(language));

  pivot.add(mesh);
  scene.add(pivot);

  this.scene = scene;
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

Planet.prototype.remove = function () {
  this.scene.remove(this.mesh);
  this.scene.remove(this.pivot);
  this.scene = this.mesh = this.pivot = null;
};

function rotate(mesh) {
  var tween = new TWEEN.Tween(mesh.rotation)
        .to({ z: Math.PI * 2 }, 64e3)
        .onComplete(function () {
          mesh.rotation.z = 0;
          tween.start();
        });

  tween.start();
}

function selectMaterial(language) {
  if (materials[language]) {
    return materials[language];
  }

  if (config.languages[language]) {
    materials[language] = generateMaterial(config.languages[language].texture);
    return materials[language];
  }

  return materials.Unknown;
}

function generateMaterial(texture) {
  return new THREE.ShaderMaterial({
    uniforms: generateUniforms(texture),
    vertexShader: shaders.planet.vertex,
    fragmentShader: shaders.planet.fragment
  });
}

function generateUniforms(texture) {
  return {
    planet: { type: 't', value: THREE.ImageUtils.loadTexture(texture) }
  };
}
