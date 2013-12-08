var THREE = require('three'),
    raf = require('raf-component');

module.exports = function camera (cam) {
  var cameraPosition = cam.position.clone(),
      cameraLookAt = new THREE.Vector3(0, 20000, 0);

  update();

  return {
    moveCamera: function (x, y, z) {
      cameraPosition.set(x, y, z);
    },
    lookTo: function (x, y, z) {
      cameraLookAt.set(x, y, z);
    }
  };

  function update () {
    raf(update);

    cam.position.lerp(cameraPosition, 0.01);
    var targetMat = new THREE.Matrix4();
    targetMat.lookAt(cam.position, cameraLookAt, cam.up);
    var targetQuat = new THREE.Quaternion();
    targetQuat.setFromRotationMatrix(targetMat);

    cam.quaternion.slerp(targetQuat, 0.07);
  }
};
