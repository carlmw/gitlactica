var THREE = require('three'),
    course = require('./course'),
    followCourse = require('./animation/follow_course'),
    orbit = require('./animation/orbit');

module.exports = function (ship, scene) {
  // TODO currentLocation shouldnt be a planet
  var start = Math.random() * ((100000 - 10000) + 10000),
      currentExit,
      currentLocation = { pivot: { position: new THREE.Vector3(start, start, 0) } },
      jump = function (planet, next) {
        var plottedCourse = course(scene, currentLocation, planet);

        if (currentExit) {
          currentExit(plottedCourse.angle, spool);
        } else {
          spool();
        }

        function spool() {
          followCourse(ship, plottedCourse.line, function () {
            currentLocation = planet;

            orbit(ship, planet, plottedCourse.angle, function (exit) {
              currentExit = exit;
              next();
            });
          });
        }
      };

  jump.location = function () {
    return currentLocation;
  };

  return jump;
};
