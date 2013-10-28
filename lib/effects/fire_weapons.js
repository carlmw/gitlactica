module.exports = function (animation, renderer, name, colour, additions, deletions, next) {
  renderer.addWeapons(name);
  renderer.showBeam();
  var i = 0,
      total = additions + deletions,
      interval = setInterval(loop, 300);

  function loop () {
    // TODO use raf to pause our intervals when we've tabbed
    var pos;

    i++;
    if (i <= deletions) {
      pos = renderer.shipPosition(name);
      renderer.extractTorpedo(colour, 0, 0, 0, pos.x, pos.y, pos.z);
      return;
    }
    if(i > deletions && i <= total) {
      if (i === deletions + 1) {
        renderer.hideBeam();
      }
      pos = renderer.shipWorldPosition(name);
      renderer.addTorpedo(colour, pos.x, pos.y, pos.z, 0, 0, 0);
      return;
    }

    clearInterval(interval);
    next();
  }
};
