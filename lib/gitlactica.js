define(['vendor/three', 'planet', 'ship', 'raf'], function (THREE, Planet, Ship, raf) {
  "use strict";

  return function (window, domContainer) {
    var distance = 1000,
        w = window.innerWidth,
        h = window.innerHeight,
        i,
        time = 0,
        speed = 20,
        camera,
        scene,
        ship,
        planet,
        renderer;

    camera = new THREE.PerspectiveCamera(30, w / h, 0.1, 10000);
    camera.position.z = distance * 10;
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);

    registerHandlers(window);

    domContainer.appendChild(renderer.domElement);

    ship = new Ship(scene);
    planet = new Planet(scene);

    animate();

    function resizeHandler () {
      w = window.innerWidth;
      h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      render();
    }

    function render () {
      renderer.render(scene, camera);
    }

    function registerHandlers (window) {
      window.addEventListener('load', render);
      window.addEventListener('resize', resizeHandler);
    }

    function animate () {
      raf(animate);
      render();

      time = time + speed;

      var angle = time * 0.001;
      planet.mesh.rotation.z = -angle;
      ship.mesh.position.set(1000 * Math.cos(angle), 1000 * Math.sin(angle), 0);
      ship.mesh.rotation.z = angle;
    }
  };
});
