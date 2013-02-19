var course = require('./course'),
    followCourse = require('./animation/follow_course'),
    orbit = require('./animation/orbit');

module.exports = function (ship, scene) {
  var currentExit;

  return function (planet, next) {
    var plottedCourse = course(scene, ship.location, planet);

    if (currentExit) {
      currentExit(plottedCourse.angle, spool);
    } else {
      spool();
    }

    function spool () {
      followCourse(ship, plottedCourse.line, function () {
        orbit(ship, planet, plottedCourse.angle, function (exit) {
          ship.location = planet;
          currentExit = exit;

          next();
        });
      });
    }
  };
};
