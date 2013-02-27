var THREE = require('three'),
    Weapon = require('./weapon'),
    shaders = require('./shaders'),
    jumpDrive = require('./jump_drive'),
    queue = require('queue-async'),
    material = new THREE.ShaderMaterial({
      uniforms: shaders.ship.uniforms,
      vertexShader: shaders.ship.vertex,
      fragmentShader: shaders.ship.fragment
    });

module.exports = Ship;

function Ship (scene, login) {
  var geometry = new THREE.CubeGeometry(100, 200, 100),
      mesh = new THREE.Mesh(geometry, material),
      pivot = new THREE.Object3D();

  this.name = login;
  this.weapon = new Weapon(this, scene);
  this.jumpDrive = jumpDrive(this, scene);

  this.queue = queue(1);
  
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
  fire: function (input, output) {
    this.weapon.fire(input, output, this.jumpDrive.location());
  },
  toString: function () {
    return '[Ship: ' + this.name + ']';
  }
};
