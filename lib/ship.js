define(['vendor/three', 'vendor/TWEEN', 'shaders'], function(THREE, TWEEN, shaders) {
  "use strict";

  return function (scene) {
    var geometry = new THREE.CubeGeometry(50, 100, 50),
        material = new THREE.ShaderMaterial({
          uniforms: shaders.uniforms,
          vertexShader: shaders.vertex.both,
          fragmentShader: shaders.fragment.ship
        }),
        mesh = new THREE.Mesh(geometry, material),
        pivot = new THREE.Object3D();

    scene.add(pivot);

    pivot.add(mesh);

    this.mesh = mesh;
    this.pivot = pivot;

    orbit(mesh);
  };

  function orbit (mesh) {
    var tween = new TWEEN.Tween({ angle: 0 })
          .to({ angle: Math.PI * 2 }, 3e3)
          .onUpdate(function () {
            mesh.position.set(
              1000 * Math.cos(this.angle),
              1000 * Math.sin(this.angle),
              0
            );
            mesh.rotation.z = this.angle;
          })
          .onComplete(function () {
            this.angle = 0;
            tween.start();
          });

    tween.start();
  }
});
