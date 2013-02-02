define([
  'vendor/three',
  'animation/orbit',
  'weapon',
  'shaders'],
function(THREE, orbit, Weapon, shaders) {
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
    this.pivot = pivot;
  };

  constructor.prototype = {
    orbit: function (destination) {
      this.deOrbit();
      this.currentOrbit = orbit(this, destination);
      this.currentLocation = destination;
    },
    deOrbit: function () {
      if (this.currentOrbit) {
        this.currentOrbit.stop();
        this.mesh.rotation.z = 0;
        delete this.currentOrbit;
      }
    },
    pewpewpew: function (count) {
      this.weapon.fire(this.currentLocation, count);
    }
  };

  return constructor;
});
