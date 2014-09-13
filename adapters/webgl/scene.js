var skyBox = require('./sky_box'),
    star = require('./star'),
    global = require('../../lib/util').global(),
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
  camera.position.x = 8000;
  world = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({ antialias: true });

  skyBox(world, skyboxCubeTexture);
  star(world, 24000, 24000, -6000, starTexture1, starTexture2, starTexture3);

  return {
    setSize: setSize,
    update: update,
    domCanvas: renderer.domElement,
    scene: world,
    camera: camera
  };

  function setSize (width, height) {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function update (ts) {
    renderer.render(world, camera);
  }
};
