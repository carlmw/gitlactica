define(['vendor/three', 'vendor/lodash'], function (THREE, _) {
  "use strict";

  // TODO orbitRadius should be read from the planet
  var orbitRadius = 2000;

  return function (scene, source, target) {
    var start = source.mesh.position.clone(),
        end = target.mesh.position.clone(),
        line = new THREE.LineCurve3(start, end),
        tan = line.getTangent(0),
        angle = Math.atan2(-tan.x, -tan.y) + (Math.PI * 0.5);

    start = getOffsetPosition(scene, angle, start).clone();
    end = getOffsetPosition(scene, angle, end).clone();

    return {
      line: new THREE.LineCurve3(start, end),
      angle: angle
    };
  };

  function getOffsetPosition(scene, angle, pos) {
    // TODO don't interact with the scene
    var pivot = new THREE.Object3D(),
        anchor = new THREE.Object3D(),
        ret;

    pivot.position = pos;
    pivot.rotation.z = -angle;

    anchor.translateY(orbitRadius);

    pivot.add(anchor);
    scene.add(pivot);

    pivot.updateMatrixWorld(true);

    ret = anchor.matrixWorld.getPosition();

    scene.remove(pivot);

    return ret;
  }
});
