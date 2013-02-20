var THREE = require('three'),
    TWEEN = require('tween'),
    raf = require('raf-component'),
    universe = require('./universe');

require('./trackball');

module.exports = function (global, domContainer) {
  "use strict";
  
  var distance = 1000,
      w = global.innerWidth,
      h = global.innerHeight,
      camera,
      scene,
      controls,
      renderer;

  camera = new THREE.PerspectiveCamera(30, w / h, 0.1, 1000000);
  camera.position.z = distance * 20;
  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(w, h);

  controls = new THREE.TrackballControls(camera);
  setupControls(controls);

  registerHandlers(global);

  domContainer.appendChild(renderer.domElement);

  // Populate the universe
  universe(scene);

  animate();

  function resizeHandler () {
    w = global.innerWidth;
    h = global.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    controls.handleResize();
  }

  function render () {
    renderer.render(scene, camera);
  }

  function registerHandlers (global) {
    global.addEventListener('resize', resizeHandler);
  }

  function animate () {
    raf(animate);
    controls.update();
    TWEEN.update();
    render();
  }

  function setupControls (controls) {
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 15;
    controls.panSpeed = 0.8;

    controls.noZoom = false;
    controls.noPan = false;

    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    controls.keys = [65, 83, 68];

    controls.addEventListener('change', render );
  }
};
