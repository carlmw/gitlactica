var THREE = require('three'),
    Weapon = require('./weapon'),
    shaders = require('./shaders'),
    jumpDrive = require('./jump_drive'),
    queue = require('queue-async'),
    material = new THREE.ShaderMaterial({
      uniforms: shaders.ship.uniforms,
      vertexShader: shaders.ship.vertex,
      fragmentShader: shaders.ship.fragment
    }),
    deepSpace = { mesh: { position: new THREE.Vector3(-10000, -10000, 0) } };

module.exports = Ship;

function Ship (scene) {
  var geometry = new THREE.CubeGeometry(100, 200, 100),
      mesh = new THREE.Mesh(geometry, material),
      pivot = new THREE.Object3D();

  this.weapon = new Weapon(this, scene);
  this.jumpDrive = jumpDrive(this, scene);

  this.queue = queue(1);
  this.location = deepSpace;
  
  scene.add(pivot);
  pivot.add(mesh);

  this.mesh = mesh;
  this.scene = scene;
  this.pivot = pivot;
}

Ship.prototype = {
  orbit: function (destination) {
    this.queue.defer(this.jumpDrive, destination);
  },
  pewpewpew: function (count) {
    this.weapon.fire(this.location, count);
  },
  extract: function (count) {
    this.weapon.tractor(this.location, count);
  }
};
