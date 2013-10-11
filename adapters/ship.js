var THREE = require('three'),
    ColladaLoader = require('collada_loader'),
    model,
    queue = require('queue-async'),
    modelFile = 'assets/freighter/models/freighter.dae',
    modelQueue = queue(1);

modelQueue.defer(loadModel);

module.exports = Ship;

function Ship(login, model) {
  var mesh = new THREE.Object3D(),
      pivot = new THREE.Object3D();

  this.name = login;
  pivot.add(mesh);

  this.mesh = mesh;
  this.mesh.position.x = 1000;
  this.pivot = pivot;

  modelQueue.defer(addModel, this);
}

Ship.prototype.toString = function () {
  return '[Ship ' + this.name + ']';
};

function loadModel(next) {
  new ColladaLoader().load(modelFile, function (obj) {
    model = obj.scene;

    next();
  });
}

function addModel(ship) {
  ship.mesh.add(model.clone());
}
