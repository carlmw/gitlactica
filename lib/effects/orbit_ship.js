module.exports = function (animation, renderer, login, x, y, z, next) {
  var moveTo = animation.tween(
    { x: 0, y: 25000, z: 0 },
    { x: x, y: y, z: z }, 6e3, function () {
      renderer.moveShip(login, this.x, this.y, this.z);
    },
    function () {
      log('Ship ' + login + ' orbiting ' + x + ', ' + y + ', ' + z);
      animation.wait(5e3, next);
    }
  );

  var orbit = animation.tween(
    { z: 0 },
    { z: -Math.PI * 2 }, 64e3,
    function () {
      renderer.rotateShip(login, 0, 0, this.z);
    }
  ).repeat(Number.POSITIVE_INFINITY);

  moveTo.chain(orbit);
  moveTo.start();
};
