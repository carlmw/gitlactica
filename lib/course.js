define(['vendor/three', 'vendor/lodash'], function (THREE, _) {
  "use strict";

  // TODO orbitRadius should be read from the planet
  var orbitRadius = 2000;

  return function (scene, source, target) {
    var start = source.mesh.position.clone(),
        end = target.mesh.position.clone(),
        line = new THREE.LineCurve3(start, end),
        tan = line.getTangent(0);

    start = getOffsetPosition(scene, tan, start).clone();
    end = getOffsetPosition(scene, tan, end).clone();

    return new THREE.LineCurve3(start, end);
  };

  function getOffsetPosition(scene, tan, pos) {
    // TODO don't interact with the scene
    var angle = Math.atan2(tan.x, tan.y) - (Math.PI * 0.5),
        pivot = new THREE.Object3D(),
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
