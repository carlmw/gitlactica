var _ = require('lodash'),
    sequence = 0;

module.exports = function (animation, renderer, name, colour, additions, deletions, next) {
  var i = 0, interval = setInterval(function () {
    var id = sequence++,
        pos = renderer.shipPosition(name);
    renderer.addTorpedo(name, id, colour);
    animation.tween(pos, { x: 0, y: 0, z: 0 }, 1e3, function () {
      renderer.moveTorpedo(id, this.x, this.y, this.z);
    }, function () {
      renderer.destroyTorpedo(id);
      next();
    }).start();

    i++;
    if (i === additions) {
      clearInterval(interval);
    }
  }, 150);
};
