var THREE = require('three'),
    TWEEN = require('tween'),
    raf = require('raf-component'),
    system = require('./system');

module.exports = function (global, domContainer) {
  "use strict";
  
  var distance = 1000,
      w = global.innerWidth,
      h = global.innerHeight,
      camera,
      scene,
      renderer;

  camera = new THREE.PerspectiveCamera(30, w / h, 0.1, 100000);
  camera.position.z = distance * 20;
  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(w, h);

  registerHandlers(global);

  domContainer.appendChild(renderer.domElement);

  // Populate the system
  system(scene);

  animate();

  function resizeHandler () {
    w = global.innerWidth;
    h = global.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  function wheelHandler (e) {
    camera.fov -= e.wheelDeltaY * 0.05;
    camera.projectionMatrix = new THREE.Matrix4().makePerspective(camera.fov, global.innerWidth / global.innerHeight, 0.1, 100000);
  }

  function render () {
    renderer.render(scene, camera);
  }

  function registerHandlers (global) {
    global.addEventListener('resize', resizeHandler);
    global.addEventListener('mousewheel', wheelHandler);
  }

  function animate () {
    raf(animate);
    TWEEN.update();
    render();
  }
};
