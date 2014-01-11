var THREE = require('three'),
    _ = require('lodash'),
    ColladaLoader = require('collada_loader'),
    model,
    queue = require('queue-async'),
    modelQueue = queue(1);

modelQueue.defer(loadModel);

module.exports = Ship;

function Ship() {
  var mesh = new THREE.Object3D(),
      pivot = new THREE.Object3D(),
      chase = new THREE.Object3D();

  pivot.add(mesh);
  pivot.add(chase);

  mesh.position.x = 5000;
  chase.position.x = 6250;
  chase.position.z = 500;
  mesh.rotation.y = Math.PI * 0.5;
  pivot.position.y = 25000;

  this.mesh = mesh;
  this.pivot = pivot;
  this.chase = chase;

  modelQueue.defer(addModel, this);
}

Ship.prototype.worldPosition = _.partial(fromMatrixWorld, 'mesh');
Ship.prototype.chasePosition = _.partial(fromMatrixWorld, 'chase');

function fromMatrixWorld (objectName) {
  var pos = new THREE.Vector3();
  return pos.getPositionFromMatrix(this[objectName].matrixWorld);
}

function loadModel(next) {
  new ColladaLoader().load('/corvette/models/corvette.dae', function (obj) {
    model = obj.scene;
    model.position.set(40, -125, 0);
    next();
  });
}

function addModel(ship, next) {
  ship.mesh.add(model.clone());
  next();
}
