module.exports = function (animation, renderer, name, x, y, z, next) {
  var moveTo = animation.tween({ x: x, y: y + 50000, z: z}, { x: x, y: y, z: z}, 5e3, function () {
    renderer.moveShip(name, this.x, this.y, this.z);
  });

  var orbit = animation.tween({ z: 0 }, { z: -Math.PI * 2 }, 6e3, function () {
    renderer.rotateShip(name, 0, 0, this.z);
  }, next).repeat(Number.POSITIVE_INFINITY);

  // TODO trigger next to activate weapons

  moveTo.chain(orbit).start();
};
