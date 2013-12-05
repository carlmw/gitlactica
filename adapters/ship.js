var THREE = require('three'),
    ColladaLoader = require('collada_loader'),
    model,
    queue = require('queue-async'),
    modelQueue = queue(1);

modelQueue.defer(loadModel);

module.exports = Ship;

function Ship() {
  var mesh = new THREE.Object3D(),
      pivot = new THREE.Object3D();

  pivot.add(mesh);

  mesh.position.x = 5000;
  mesh.rotation.y = Math.PI * 0.5;
  pivot.position.y = 25000;

  this.mesh = mesh;
  this.pivot = pivot;

  modelQueue.defer(addModel, this);
}

Ship.prototype.position = function () {
  var pos = new THREE.Vector3();
  return pos.getPositionFromMatrix(this.mesh.matrixWorld);
};

function loadModel(next) {
  new ColladaLoader().load('/assets/freighter/models/freighter.dae', function (obj) {
    model = obj.scene;
    model.scale.set(0.5, 0.5, 0.5);

    next();
  });
}

function addModel(ship, next) {
  ship.mesh.add(model.clone());
  next();
}
