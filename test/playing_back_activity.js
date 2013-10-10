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
      scripts: ["../standins.js", "../build.js"],
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
        "Requested https://api.github.com/repos/carlmw/gitlactica",
        "Added planet carlmw/gitlactica with colour 0xffffff",
        "Moved planet carlmw/gitlactica to 0, 0, 0",
        "Looked at 0, 0, 0",
        "Requested https://api.github.com/repos/carlmw/gitlactica/commits?since=" + moment().startOf('month').format()
      ]).to.deep.equal(messages);
    });
  });
});
