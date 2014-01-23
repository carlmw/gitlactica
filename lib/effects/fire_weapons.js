var _ = require('lodash');

module.exports = function (animation, renderer, name, repo, colour, additions, deletions, next) {
  renderer.addWeapons(name);
  if (deletions > 0 ) renderer.showBeam();
  if (additions + deletions === 0) return next();
  var currentComplete = 0,
      planet = renderer.planetPosition(repo),
      INF = Number.POSITIVE_INFINITY,
      total = additions + deletions;

  _.times(total, loop);

  function loop (n) {
    animation.wait(300 * n, function () {
      var pos,
          torpedo;

      if (n < deletions) {
        pos = renderer.shipPosition(name);
        torpedo = renderer.extractTorpedo(colour);
        animateTorpedo(
          renderer.moveExtractedTorpedo,
          torpedo,
          { x: 0, y: 0, z: 0 },
          { x: pos.x, y: pos.y, z: pos.z }
        );
      }

      if(n >= deletions && n < total) {
        pos = renderer.shipWorldPosition(name);
        torpedo = renderer.addTorpedo(colour);
        animateTorpedo(
          renderer.moveTorpedo,
          torpedo,
          { x: pos.x, y: pos.y, z: pos.z },
          { x: planet.x, y: planet.y, z: planet.z }
        );
      
        animation.wait(1700, function () {
          renderer.detonateExplosion(pos.x, pos.y, pos.z, planet.x, planet.y, planet.z);
        });
      }
    });
  }

  function done () {
    currentComplete++;
    if (currentComplete === deletions) renderer.hideBeam();
    if (currentComplete === total) next();
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
