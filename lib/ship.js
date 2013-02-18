var THREE = require('three'),
    orbit = require('./animation/orbit'),
    followCourse = require('./animation/follow_course'),
    course = require('./course'),
    Weapon = require('./weapon'),
    shaders = require('./shaders'),
    material = new THREE.ShaderMaterial({
      uniforms: shaders.ship.uniforms,
      vertexShader: shaders.ship.vertex,
      fragmentShader: shaders.ship.fragment
    });

module.exports = Ship;

function Ship (scene) {
  var geometry = new THREE.CubeGeometry(100, 200, 100),
      mesh = new THREE.Mesh(geometry, material),
      pivot = new THREE.Object3D();

  this.weapon = new Weapon(this, scene);

  scene.add(pivot);
  pivot.add(mesh);

  this.mesh = mesh;
  this.scene = scene;
  this.pivot = pivot;
}

Ship.prototype = {
  orbit: function (destination) {
    var plot;

    if (this.orbiting) {
      plot = course(this.scene, this.orbiting, destination);
      this.tween
        .stop()
        .to({ angle: plot.angle }, 3e3)
        .onComplete(function () {
          this.tween = followCourse(this, plot.line);
            this.tween.onComplete(function () {
              this.tween = orbit(this, destination, plot.angle);
            }.bind(this));
        }.bind(this))
        .start();
    } else {
      this.tween = orbit(this, destination, 0);
    }
    this.orbiting = destination;
  },
  pewpewpew: function (count) {
    this.weapon.fire(this.orbiting, count);
  },
  extract: function (count) {
    this.weapon.tractor(this.orbiting, count);
  }
};
