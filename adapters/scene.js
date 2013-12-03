var skyBox = require('./sky_box'),
    TWEEN = require('tween.js'),
    global = require('../lib/util').global(),
    raf = require('raf-component'),
    THREE = require('three');

module.exports = function scene () {
  var distance = 2000,
      camera,
      world,
      renderer;

  camera = new THREE.PerspectiveCamera(45, global.innerWidth / global.innerHeight, 0.1, 100000000);
  camera.up = new THREE.Vector3(0, 0, 1);
  camera.useQuaternion = true;
  camera.position.z = 1200;
  world = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ antialias: true });

  var point = new THREE.PointLight(0xffffff, 1, 0);
  point.position.y = 8000;
  point.position.x = 8000;

  world.add(point);
  world.add(new THREE.AmbientLight(0x111111));

  skyBox(world, '/textures/stars.jpg');

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
