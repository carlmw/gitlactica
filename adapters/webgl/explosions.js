var THREE = require('three'),
    _ = require('lodash'),
    raf = require('raf-component'),
    light = new THREE.PointLight(0xffffff, 4, 300),
    i = 0,
    caster = new THREE.Raycaster(),
    EXPLOSION_COUNT = 10;

light.position.set(Math.POSITIVE_INFINITY, Math.POSITIVE_INFINITY, Math.POSITIVE_INFINITY);

module.exports = function explosions (scene) {
  var lights = _.times(EXPLOSION_COUNT, function () {
    var l = light.clone();
    scene.add(l);
    return l;
  });

  update();

  return function detonate (sx, sy, sz, tx, ty, tz, targetMesh) {
    if (i >= EXPLOSION_COUNT) i = 0;
    var s = new THREE.Vector3(sx, sy, sz),
        t = new THREE.Vector3(tx, ty, tz),
        direction = t.sub(s).normalize();

    caster.set(s, direction);

    caster.intersectObject(targetMesh).forEach(function (collision) {
      lights[i].intensity = 4;
      lights[i].position = caster.ray.at(collision.distance - 75);
      i++;
      log('Detonated torpedo');
    });
  };

  function update () {
    raf(update);
    lights.forEach(dim);
  }

  function dim (light) {
    light.intensity = Math.max(0, light.intensity - (light.intensity * 0.1));
  }
};
