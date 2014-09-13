var THREE = require('three');

module.exports = function camera (cam) {
  var cameraPosition = cam.position.clone(),
      targetMat = new THREE.Matrix4(),
      targetQuat = new THREE.Quaternion(),
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
    },
    update: update
  };

  function update (delta) {
    var rate = (delta * 0.01) || 1;

    cam.position.lerp(cameraPosition, positionSpeed * rate);
    targetMat.lookAt(cam.position, cameraLookAt, cam.up);
    targetQuat.setFromRotationMatrix(targetMat);

    cam.quaternion.slerp(targetQuat, lookAtSpeed * rate);
  }
};
