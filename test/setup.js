(function (global) {
var sinonChai = require('sinon-chai'),
    chai = require('chai'),
    sinon = require('sinon');
global.chai = chai;
global.sinon = undefined;
global.expect = chai.expect;
global.AssertionError = chai.AssertionError;
require('sinon-mocha').enhance(sinon);
chai.use(sinonChai);

beforeEach(function () {
  global.sinon = sinon.sandbox.create();
});

afterEach(function () {
  global.sinon.restore();
});

})(global);
