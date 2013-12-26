var THREE = require('three'),
    raf = require('raf-component');

module.exports = function camera (cam) {
  var cameraPosition = cam.position.clone(),
      cameraLookAt = new THREE.Vector3(0, 40000, 0),
      lookAtSpeed = 1,
      positionSpeed = 1;

  update();

  return {
    moveCamera: function (x, y, z, d) {
      positionSpeed = d;
      cameraPosition.set(x, y, z);
    },
    lookTo: function (x, y, z, d) {
      lookAtSpeed = d;
      cameraLookAt.set(x, y, z);
    }
  };

  function update () {
    raf(update);

    cam.position.lerp(cameraPosition, positionSpeed);
    var targetMat = new THREE.Matrix4();
    targetMat.lookAt(cam.position, cameraLookAt, cam.up);
    var targetQuat = new THREE.Quaternion();
    targetQuat.setFromRotationMatrix(targetMat);

    cam.quaternion.slerp(targetQuat, lookAtSpeed);
  }
};
