define([
  'vendor/three',
  'animation/orbit',
  'animation/follow_course',
  'course',
  'weapon',
  'shaders'],
function(THREE, orbit, followCourse, course, Weapon, shaders) {
  "use strict";

  var constructor = function (scene) {
    var geometry = new THREE.CubeGeometry(50, 100, 50),
        material = new THREE.ShaderMaterial({
          uniforms: shaders.uniforms,
          vertexShader: shaders.vertex.both,
          fragmentShader: shaders.fragment.ship
        }),
        mesh = new THREE.Mesh(geometry, material),
        pivot = new THREE.Object3D();

    this.weapon = new Weapon(this, scene);

    scene.add(pivot);
    pivot.add(mesh);

    this.mesh = mesh;
    this.scene = scene;
    this.pivot = pivot;
  };

  constructor.prototype = {
    orbit: function (destination) {
      var plot;

      if (this.orbiting) {
        plot = course(this.scene, this.orbiting, destination);
        // debugger;
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

  return constructor;
});
