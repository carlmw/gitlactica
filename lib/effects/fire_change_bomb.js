var _ = require('lodash');

module.exports = function (animation, renderer, name, repo, colour, next) {
  renderer.addWeapons(name);
  var currentComplete = 0,
      planet = renderer.planetPosition(repo),
      TOTAL = 10,
      INF = Number.POSITIVE_INFINITY;
  
  _.times(TOTAL, loop);

  function loop (n) {
    var pos = renderer.shipWorldPosition(name),
        torpedo = renderer.addTorpedo(colour),
        target = {
          x: planet.x + Math.random() * 500,
          y: planet.y + Math.random() * 500,
          z: planet.z + Math.random() * 500
        };

    animateTorpedo(
      renderer.moveTorpedo,
      torpedo,
      { x: pos.x, y: pos.y, z: pos.z },
      target
    );
    
    animation.wait(1700, function () {
      renderer.detonateExplosion(pos.x, pos.y, pos.z, target.x, target.y, target.z);
    });
  }

  function done () {
    currentComplete++;
    if (currentComplete === TOTAL) next();
  }

  function animateTorpedo(move, torpedo, from, to) {
    animation.tween(
      from,
      to, 2e3, function () {
        move(torpedo, this.x, this.y, this.z);
      }, function () {
        move(torpedo, INF, INF, INF);
        done();
      })
      .start();
  }
};
