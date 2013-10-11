var jsdom = require('jsdom'),
    connect = require('connect'),
    moment = require('moment'),
    fs = require('fs');

describe("Playing back activity", function () {
  var messages;

  before(function () {
    connect(connect.static(__dirname + '/../')).listen(8000);
  });

  beforeEach(function (done) {
    jsdom.env({
      url: 'http://localhost:8000#/carlmw/gitlactica',
      scripts: ["test/standins/clock.js", "../standins.js", "../build.js"],
      done: function (err, window) {
        if (err) console.error(err);
        messages = window.log.messages;
        done();
      }
    });
  });

  describe("for the most recent commits", function () {
    it("is done in serial", function () {
      expect([
        "Started renderer",
        "Set canvas size 1024x768",
        "Added planet carlmw/gitlactica with colour 0xffffff",
        "Moved planet carlmw/gitlactica to 0, 0, 0",
        "Looked at 0, 0, 0",
        "Added ship carlmw",
        "Moved ship carlmw to 0, 50000, 0",
        "Animated for 5000",
        "Moved ship carlmw to 0, 0, 0",
        "Rotated ship carlmw to 0, 0, 0",
        "Animated for 6000",
        "Rotated ship carlmw to 0, 0, -6.283185307179586",
        "Added ship bobson",
        "Moved ship bobson to 0, 50000, 0",
        "Animated for 5000",
        "Moved ship bobson to 0, 0, 0",
        "Rotated ship bobson to 0, 0, 0",
        "Animated for 6000",
        "Rotated ship bobson to 0, 0, -6.283185307179586"
      ]).to.deep.equal(messages);
    });
  });
});
