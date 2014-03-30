(function (global) {
global.window = global; // Fake the window
var sinonChai = require('sinon-chai'),
    TWEEN = require('tween.js'),
    _ = require('lodash'),
    chai = require('chai'),
    sinon = require('sinon');
global.chai = chai;
global.sinon = undefined;
global.expect = chai.expect;
global.AssertionError = chai.AssertionError;
require('sinon-mocha').enhance(sinon);
chai.use(sinonChai);

beforeEach(function () {
  global.sinon = sinon.sandbox.create({
    useFakeTimers: true
  });
});

afterEach(function () {
  global.sinon.restore();
});

global.playAnimation = function playAnimation(millis, fps) {
  TWEEN.update();
  _.times(fps * (millis / 1000), function () {
    sinon.clock.tick(Math.round(1000 / fps));
    TWEEN.update();
  });
};
global.playAnimation.cleanUp = TWEEN.removeAll;
})(global);
