var skyBox = require('./sky_box'),
    global = require('../lib/util').global(),
    THREE = require('three');

module.exports = function scene (config) {
  var distance = 1000,
      camera,
      scene,
      renderer;

  camera = new THREE.PerspectiveCamera(30, global.innerWidth / global.innerHeight, 0.1, 100000000);
  camera.up = new THREE.Vector3(0, 0, 1);
  camera.useQuaternion = true;
  camera.position.z = -distance * 6;
  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ antialias: true });
  config.maxAnisotropy = renderer.getMaxAnisotropy();

  skyBox(scene, config.sky_box);

  scene.add(new THREE.PointLight(0xffffff, 1, 0));
  scene.add(new THREE.AmbientLight(0x333333));

  skyBox(scene, config.sky_box);

  return {
    setSize: setSize,
    render: render,
    domCanvas: renderer.domElement,
    scene: scene,
    camera: camera
  };

  function setSize (width, height) {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function render () {
    renderer.render(scene, camera);
  }
};
