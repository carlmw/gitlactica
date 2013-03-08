// TODO orbitRadius should be read from the planet
var THREE = require('three'),
    config = require('../config');

module.exports = course;

function course(scene, source, target) {
  var start = source.pivot.position.clone(),
      end = target.pivot.position.clone(),
      line = new THREE.LineCurve3(start, end),
      tan = line.getTangent(0),
      angle = Math.atan2(-tan.x, -tan.y) + (Math.PI * 0.5);

  start = getOffsetPosition(scene, angle, start).clone();
  end = getOffsetPosition(scene, angle, end).clone();

  return { line: new THREE.LineCurve3(start, end), angle: angle };
}

function getOffsetPosition(scene, angle, pos) {
  // TODO don't interact with the scene
  var pivot = new THREE.Object3D(),
      anchor = new THREE.Object3D(),
      ret;

  pivot.position = pos;
  pivot.rotation.z = -angle;

  anchor.translateY(config.orbit.radius);

  pivot.add(anchor);
  scene.add(pivot);

  pivot.updateMatrixWorld(true);

  ret = new THREE.Vector3().getPositionFromMatrix(anchor.matrixWorld);

  scene.remove(pivot);

  return ret;
}
