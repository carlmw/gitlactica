var THREE = require('three'),
    TWEEN = require('tween'),
    raf = require('raf-component'),
    skyBox = require('./sky_box'),
    config = require('../config'),
    window = require('./util').global(),
    universe = require('./universe');

require('./trackball');

module.exports = function (domContainer) {
  "use strict";

  var distance = 1000,
      w = global.innerWidth,
      h = global.innerHeight,
      camera,
      scene,
      controls,
      renderer;

  camera = new THREE.PerspectiveCamera(30, w / h, 0.1, 100000000);
  camera.position.z = distance * 20;
  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(w, h);
  config.maxAnisotropy = renderer.getMaxAnisotropy();

  controls = new THREE.TrackballControls(camera);
  setupControls(controls);

  registerHandlers(window);

  domContainer.appendChild(renderer.domElement);

  skyBox(scene, config.sky_box);

  scene.add(new THREE.AmbientLight(0xCCCCCC));

  // Populate the universe
  universe(scene, camera);

  animate();

  function resizeHandler() {
    w = window.innerWidth;
    h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    controls.handleResize();
  }

  function render() {
    renderer.render(scene, camera);
  }

  function registerHandlers(window) {
    window.addEventListener('resize', resizeHandler);
  }

  function animate() {
    raf(animate);
    controls.update();
    TWEEN.update();
    render();
  }

  function setupControls(controls) {
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 15;
    controls.panSpeed = 0.8;

    controls.noZoom = false;
    controls.noPan = false;

    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    controls.keys = [65, 83, 68];

    controls.addEventListener('change', render);
  }
};
