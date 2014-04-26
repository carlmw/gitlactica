var THREE = require('three'),
    raf = require('raf-component');

module.exports = function camera (cam) {
  var cameraPosition = cam.position.clone(),
      lastTs,
      targetMat = new THREE.Matrix4(),
      targetQuat = new THREE.Quaternion(),
      cameraLookAt = new THREE.Vector3(0, 40000, 0),
      lookAtSpeed = 1,
      positionSpeed = 1;

  update();

  return {
    moveCamera: function (x, y, z, d) {
      positionSpeed = d * 15;
      cameraPosition.set(x, y, z);
    },
    lookTo: function (x, y, z, d) {
      lookAtSpeed = d * 15;
      cameraLookAt.set(x, y, z);
    }
  };

  function update (ts) {
    raf(update);

    var rate = ((ts - lastTs) / 1000) || 1;
    lastTs = ts;

    cam.position.lerp(cameraPosition, positionSpeed * rate);
    targetMat.lookAt(cam.position, cameraLookAt, cam.up);
    targetQuat.setFromRotationMatrix(targetMat);

    cam.quaternion.slerp(targetQuat, lookAtSpeed * rate);
  }
};
