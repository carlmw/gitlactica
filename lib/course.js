define(['vendor/three', 'vendor/lodash'], function (THREE, _) {
  "use strict";

  var orbitRadius = 2000;

  return function (source, target) {
    var start = source.mesh.position.clone(),
        end = target.mesh.position.clone(),
        distance = start.distanceTo(end),
        n = 1 / distance,
        line = new THREE.LineCurve3(start, end),
        vertices = _.map([n * orbitRadius, 1 - (n * orbitRadius)], line.getPoint, line);

    start.y += orbitRadius;
    end.y += orbitRadius;

    vertices = [start].concat(vertices).concat(end);

    // TODO create curves between points
    var curve = new THREE.CurvePath();

    curve.add(new THREE.LineCurve3(vertices[0], vertices[1]));
    curve.add(new THREE.LineCurve3(vertices[1], vertices[2]));
    curve.add(new THREE.LineCurve3(vertices[2], vertices[3]));

    return curve;
  };
});
