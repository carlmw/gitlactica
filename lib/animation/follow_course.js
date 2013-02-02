define(['vendor/TWEEN'], function (TWEEN) {
  "use strict";

  return function (ship, course) {
    ship.mesh.position.set(0, 0, 0);

    var pivot = ship.pivot,
        mesh = ship.mesh,
        tween = new TWEEN.Tween({ control: 0 })
          .to({ control: 1 }, 3e3)
          .onUpdate(function () {
            var tan = course.getTangent(this.control);
            pivot.position = course.getPoint(this.control);
            pivot.rotation.z = Math.atan2(-tan.x, tan.y);
          });

    tween.start();

    return tween;
  };
});
