var THREE = require('three'),
    ColladaLoader = require('collada_loader'),
    model,
    config = require('../config'),
    queue = require('queue-async'),
    modelQueue = queue(1);

modelQueue.defer(loadModel);

module.exports = Ship;

function Ship(login, model) {
  var mesh = new THREE.Object3D(),
      pivot = new THREE.Object3D();

  this.name = login;
  pivot.add(mesh);

  this.mesh = mesh;
  this.mesh.position.x = 2000;
  this.pivot = pivot;

  modelQueue.defer(addModel, this);
}

Ship.prototype.toString = function () {
  return '[Ship ' + this.name + ']';
};

Ship.prototype.position = function () {
  var pos = new THREE.Vector3();
  return pos.getPositionFromMatrix(this.mesh.matrixWorld);
};

function loadModel(next) {
  new ColladaLoader().load(config.ship_model, function (obj) {
    model = obj.scene;

    next();
  });
}

function addModel(ship, next) {
  ship.mesh.add(model.clone());
  next();
}
