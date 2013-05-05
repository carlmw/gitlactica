var THREE = require('three'),
    TWEEN = require('tween'),
    raf = require('raf-component'),
    skyBox = require('./sky_box'),
    config = require('../config'),
    window = require('./util').global(),
    universe = require('./universe');

module.exports = function (domContainer) {
  "use strict";

  var distance = 1000,
      w = global.innerWidth,
      h = global.innerHeight,
      camera,
      scene,
      renderer;

  camera = new THREE.PerspectiveCamera(30, w / h, 0.1, 100000000);
  camera.up = new THREE.Vector3(0, 0, 1);
  camera.useQuaternion = true;
  camera.position.z = distance * 6;
  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(w, h);
  config.maxAnisotropy = renderer.getMaxAnisotropy();

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
  }

  function render() {
    renderer.render(scene, camera);
  }

  function registerHandlers(window) {
    window.addEventListener('resize', resizeHandler);
  }

  function animate() {
    raf(animate);
    TWEEN.update();
    render();
  }
};
