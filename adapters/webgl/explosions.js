var THREE = require('three'),
    _ = require('lodash'),
    raf = require('raf-component'),
    light = new THREE.PointLight(0xffffff, 1, 600),
    i = 0,
    EXPLOSION_COUNT = 10;

light.position.set(Math.POSITIVE_INFINITY, Math.POSITIVE_INFINITY, Math.POSITIVE_INFINITY);

// generate a number of lights
module.exports = function explosions (scene) {
  var lights = _.times(EXPLOSION_COUNT, function () {
    var l = light.clone();
    scene.add(l);
    return l;
  });

  update();

  return function detonate (sx, sy, sz, dx, dy, dz) {
    var s = new THREE.Vector3(sx, sy, sz),
        d = new THREE.Vector3(dx, dy, dz);
    if (i >= EXPLOSION_COUNT) {
      i = 0;
    }
    lights[i].intensity = 1;
    lights[i].position = s.lerp(d, 0.75);
    i++;
    log('Detonated torpedo');
  };

  function update () {
    raf(update);
    lights.forEach(dim);
  }

  function dim (light) {
    light.intensity = Math.max(0, light.intensity - (light.intensity * 0.1));
  }
};
