var THREE = require('three'),
    ColladaLoader = require('collada_loader'),
    models = {};

module.exports = Ship;

function Ship(login, model) {
  var mesh = new THREE.Object3D(),
      pivot = new THREE.Object3D();

  this.name = login;
  pivot.add(mesh);

  this.mesh = mesh;
  this.pivot = pivot;
}

Ship.prototype.toString = function () {
  return '[Ship ' + this.name + ']';
};

// function loadModel(next) {
//   new ColladaLoader().load(config.model, function (obj) {
//     model = obj.scene;

//     next();
//   });
// }

// function addModel(ship) {
//   ship.mesh.add(model.clone());
// }
