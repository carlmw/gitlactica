define(['vendor/three'], function (THREE) {
  "use strict";

  return function (source, target) {
    var v1 = source.mesh.position.clone(),
        v2 = v1.clone(),
        v3 = target.mesh.position.clone(),
        v4 = v3.clone();

    // TODO dynamically calculate curve
    v1.y -= 1000;
    v2.y -= 1000;
    v2.x += 2000;
    v3.y += 1000;
    v3.x -= 2000;
    v4.y += 1000;
    
    return new THREE.CubicBezierCurve3(v1, v2, v3, v4);
  };
});
