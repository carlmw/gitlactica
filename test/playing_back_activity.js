var jsdom = require('jsdom'),
    connect = require('connect'),
    fs = require('fs');

describe("Playing back activity", function () {
  var messages;

  before(function () {
    connect(connect.static(__dirname + '/../')).listen(8000);
  });

  beforeEach(function (done) {
    jsdom.env({
      url: 'http://localhost:8000#/carlmw/gitlactica',
      scripts: ["../standins.js", "../build.js"],
      done: function (err, window) {
        if (err) console.error(err);
        messages = window.log.messages;
        done();
      }
    });
  });

  describe("for the last month", function () {
    it("is done in serial", function () {
      expect([
        "Started renderer",
        "Set canvas size 1024x768",
        "Added planet carlmw/gitlactica with colour 0xffffff",
        "Moved planet carlmw/gitlactica to 0, 0, 0"
      ]).to.equal(messages);
    });
  });
});
