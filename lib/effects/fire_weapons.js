module.exports = function (animation, renderer, name, colour, additions, deletions, next) {
  var i = 1, interval = setInterval(function () {
    var pos = renderer.shipPosition(name);
    renderer.addTorpedo(colour, pos.x, pos.y, pos.z);

    if(i++ === additions) {
      clearInterval(interval);
      next();
    }
  }, 300);
};
