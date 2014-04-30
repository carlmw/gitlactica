var THREE = require('three'),
    _ = require('lodash'),
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
  chase.position.x = 6750;
  chase.position.z = 500;
  mesh.rotation.x = -Math.PI * 0.5;
  mesh.rotation.z = Math.PI;
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
  new THREE.JSONLoader().load('/desolator.js', function (geo, materials) {
    model = new THREE.Mesh(geo, new THREE.MeshFaceMaterial(materials));
    model.scale.multiplyScalar(20);
    model.position.set(-70, -60, 0);
    next();
  });
}

function addModel(ship, next) {
  ship.mesh.add(model.clone());
  next();
}
