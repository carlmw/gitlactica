(function (global) {
var sinonChai = require('sinon-chai'),
    chai = require('chai');

global.sinon = require('sinon');
global.chai = chai;
global.should = chai.should();
global.expect = chai.expect;
global.AssertionError = chai.AssertionError;
global.mockery = mockery = require('mockery');
require('sinon-mocha').enhance(global.sinon);
chai.use(sinonChai);
global.mockery.enable({
  warnOnUnregistered: false,
  useCleanCache: true
});

})(global);