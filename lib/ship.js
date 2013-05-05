var THREE = require('three'),
    Weapon = require('./weapon'),
    shaders = require('./shaders'),
    jumpDrive = require('./jump_drive'),
    queue = require('queue-async'),
    config = require('../config').ship,
    ColladaLoader = require('../vendor/collada_loader'),
    modelQueue = queue(1),
    model;

modelQueue.defer(function (next) {
  new ColladaLoader().load(config.model, function (obj) {
    model = obj.scene;
    next();
  });
});

module.exports = Ship;

function Ship(scene, login) {
  var mesh = new THREE.Object3D(),
      pivot = new THREE.Object3D();

  this.name = login;
  this.weapon = new Weapon(this, scene);
  this.jumpDrive = jumpDrive(this, scene);

  pivot.add(mesh);
  scene.add(pivot);

  this.mesh = mesh;
  this.scene = scene;
  this.pivot = pivot;

  if (!model) {
    modelQueue.defer(loadModel);
  }

  modelQueue.defer(addModel, this);
}

Ship.prototype = {
  orbit: function (destination, next) {
    if (destination === this.jumpDrive.location()) {
      return;
    }
    this.jumpDrive(destination, next);
  },
  fire: function (input, output, next) {
    this.weapon.fire(input, output, this.jumpDrive.location(), next);
  },
  toString: function () {
    return '[Ship: ' + this.name + ']';
  }
};

function loadModel(next) {
  new ColladaLoader().load(config.model, function (obj) {
    model = obj.scene;

    next();
  });
}

function addModel(ship, next) {
  ship.mesh.add(model.clone());

  next();
}
