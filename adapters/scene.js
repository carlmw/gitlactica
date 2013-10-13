var skyBox = require('./sky_box'),
    TWEEN = require('tween.js'),
    global = require('../lib/util').global(),
    raf = require('raf-component'),
    THREE = require('three');

module.exports = function scene (config) {
  var distance = 1000,
      camera,
      world,
      renderer;

  camera = new THREE.PerspectiveCamera(30, global.innerWidth / global.innerHeight, 0.1, 100000000);
  camera.up = new THREE.Vector3(0, 0, 1);
  camera.useQuaternion = true;
  camera.position.y = distance * 5;
  camera.position.z = distance * 2;
  world = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ antialias: true });
  config.maxAnisotropy = renderer.getMaxAnisotropy();

  skyBox(world, config.sky_box);

  var point = new THREE.PointLight(0xffffff, 1, 0);
  point.position.y = 4000;
  point.position.z = 1000;

  world.add(point);
  world.add(new THREE.AmbientLight(0x111111));

  skyBox(world, config.sky_box);

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
