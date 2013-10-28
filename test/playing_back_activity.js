var jsdom = require('jsdom'),
    connect = require('connect'),
    moment = require('moment'),
    fs = require('fs');

describe("Playing back activity", function () {
  var messages;

  before(function () {
    connect(connect.static(__dirname + '/../')).listen(8001);
  });

  beforeEach(function (done) {
    jsdom.env({
      url: 'http://localhost:8001#/carlmw/gitlactica',
      scripts: ["test/standins/clock.js", "../standins.js", "../build.js"],
      done: function (err, window) {
        if (err) {
          console.error(err);
        }
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
        "Added planet carlmw/gitlactica with colour 0xf15501",
        "Moved planet carlmw/gitlactica to 0, 0, 0",
        "Looked at 0, 0, 0",
        "Added ship carlmw",
        "Moved ship carlmw to 0, 25000, 0",
        "Animated for 2000",
        "Moved ship carlmw to 0, 0, 0",
        "Rotated ship carlmw to 0, 0, 0",
        "Animated for 12000",
        "Rotated ship carlmw to 0, 0, -6.283185307179586",
        "Added weapons to carlmw",
        "Shown beam",
        "Tractored torpedo with colour 0xf15501 from 0, 0, 0 to 200, 300, 400",
        "Hidden beam",
        "Added torpedo with colour 0xf15501 from 100, 200, 300 to 0, 0, 0",
        "Added ship bobson",
        "Moved ship bobson to 0, 25000, 0",
        "Animated for 2000",
        "Moved ship bobson to 0, 0, 0",
        "Rotated ship bobson to 0, 0, 0",
        "Animated for 12000",
        "Rotated ship bobson to 0, 0, -6.283185307179586",
        "Added weapons to bobson",
        "Shown beam",
        "Tractored torpedo with colour 0x3581ba from 0, 0, 0 to 200, 300, 400",
        "Hidden beam",
        "Added torpedo with colour 0x3581ba from 100, 200, 300 to 0, 0, 0"
      ]).to.deep.equal(messages);
    });
  });
});
