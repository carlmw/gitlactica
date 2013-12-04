var THREE = require('three');

module.exports = function camera (cam) {
  return {
    lookAt: function (x, y, z) {
      cam.lookAt({ x: x, y: y, z: z });
    },
    cameraPosition: function () {
      return cam.position;
    },
    moveCamera: function (x, y, z) {
      cam.position.set(x, y, z);
    },
    rotateCamera: function (x, y, z) {
      cam.rotation.set(x, y, z);
    },
    lerpCameraPosition: function (x, y, z, alpha) {
      cam.position.lerp(new THREE.Vector3(x, y, z), alpha);
    }
  };
};
