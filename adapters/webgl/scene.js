var skyBox = require('./sky_box'),
    star = require('./star'),
    TWEEN = require('tween.js'),
    global = require('../../lib/util').global(),
    raf = require('raf-component'),
    THREE = require('three');

module.exports = function scene (skyboxCubeTexture, starTexture1, starTexture2, starTexture3) {
  var distance = 2000,
      camera,
      world,
      renderer;

  camera = new THREE.PerspectiveCamera(45, global.innerWidth / global.innerHeight, 0.1, 100000000);
  camera.up = new THREE.Vector3(0, 0, 1);
  camera.useQuaternion = true;
  camera.position.z = 3000;
  world = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ antialias: true });

  skyBox(world, skyboxCubeTexture);
  star(world, 6000, 6000, -6000, starTexture1, starTexture2, starTexture3);

  return {
    setSize: setSize,
    render: render,
    domCanvas: renderer.domElement,
    scene: world,
    camera: camera
  };

  function setSize (width, height) {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function render () {
    raf(render);
    TWEEN.update();
    renderer.render(world, camera);
  }
};
