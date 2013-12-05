module.exports = function (animation, renderer, login, x, y, z, next) {
  var panTo = animation.tween(
    { x: 0, y: 2500, z: 0 },
    { x: 5000, y: 25000, z: 0 }, 1e3, function () {
      renderer.lookAt(this.x, this.y, this.z);
    }, function () {
      log('Following ship ' + login);
    });
  var camPos = renderer.cameraPosition();
  var moveTo = animation.tween(
    { shipX: 0, shipY: 25000, shipZ: 0, alpha: 0 },
    { shipX: x, shipY: y, shipZ: z, alpha: 1 }, 5e3, function () {
      renderer.moveShip(login, this.shipX, this.shipY, this.shipZ);
      renderer.lerpCameraPosition(this.shipX + 5500, this.shipY + 200, this.shipZ + 200, this.alpha);
      renderer.lookAt(this.shipX + 5000, this.shipY, this.shipZ);
    },
    function () {
      log('Ship ' + login + ' orbiting ' + x + ', ' + y + ', ' + z);

      setTimeout(next, 5e3);
    }
  );

  var orbit = animation.tween(
    { z: 0 },
    { z: -Math.PI * 2 }, 24e3,
    function () {
      var shipPos = renderer.shipWorldPosition(login);
      renderer.rotateShip(login, 0, 0, this.z);
      renderer.lookAt(shipPos.x, shipPos.y, shipPos.z);
    }
  ).repeat(Number.POSITIVE_INFINITY);

  panTo.chain(moveTo);
  moveTo.chain(orbit);

  panTo.start();
};
