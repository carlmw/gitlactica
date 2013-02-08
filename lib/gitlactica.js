define(['vendor/three', 'vendor/TWEEN', 'system', 'raf'], function (THREE, TWEEN, system, raf) {
  "use strict";

  return function (window, domContainer) {
    var distance = 1000,
        w = window.innerWidth,
        h = window.innerHeight,
        camera,
        scene,
        ship,
        planet,
        planet2,
        renderer;

    camera = new THREE.PerspectiveCamera(30, w / h, 0.1, 100000);
    camera.position.z = distance * 20;
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);

    registerHandlers(window);

    domContainer.appendChild(renderer.domElement);

    // Populate the system
    system(scene);

    animate();

    function resizeHandler () {
      w = window.innerWidth;
      h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    function render () {
      renderer.render(scene, camera);
    }

    function registerHandlers (window) {
      window.addEventListener('resize', resizeHandler);
    }

    function animate () {
      raf(animate);
      TWEEN.update();
      render();
    }
  };
});
