module.exports = function (animation, renderer, name, x, y, z, next) {
  var moveTo = animation.tween(
    { x: x, y: y + 25000, z: z},
    { x: x, y: y, z: z}, 2e3, function () {
      renderer.moveShip(name, this.x, this.y, this.z);
    },
    next
  );

  var orbit = animation.tween(
    { z: 0 },
    { z: -Math.PI * 2 }, 12e3,
    function () {
      renderer.rotateShip(name, 0, 0, this.z);
    }
  ).repeat(Number.POSITIVE_INFINITY);

  // TODO trigger next to activate weapons
  moveTo.chain(orbit).start();
};
