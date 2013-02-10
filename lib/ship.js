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
      if (this.orbiting) {
        var plot = course(this.orbiting, destination);
        this.tween
          .onComplete(function () {
            this.tween = followCourse(this, plot);
            this.tween.onComplete(function () {
              orbit(this, destination);
              this.orbiting = destination;
            }.bind(this));
          }.bind(this));
      } else {
        this.tween = orbit(this, destination);
        this.orbiting = destination;
      }
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
