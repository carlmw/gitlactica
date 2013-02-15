var sinonChai = require('sinon-chai');

global.sinon = require('sinon');
global.chai = require('chai');
global.should = require('chai').should();
global.expect = require('chai').expect;
global.AssertionError = require('chai').AssertionError;
global.mockery = mockery = require('mockery');

global.swallow = function (thrower) {
    try {
        thrower();
    } catch (e) { }
};

global.chai.use(sinonChai);
