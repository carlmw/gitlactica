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
        "Requested https://api.github.com/repos/carlmw/gitlactica",
        "Added planet carlmw/gitlactica with colour 0xffffff",
        "Moved planet carlmw/gitlactica to 0, 0, 0",
        "Looked at 0, 0, 0",
        "Requested https://api.github.com/repos/carlmw/gitlactica/commits?since=" + moment().startOf('month').format(),
        "Set interval 0 at 1000",
        "after 1000 millis",
        "Requested https://api.github.com/repos/carlmw/gitlactica/commits/d94709d1942c14fe4bd06e24e9639ed30232b58e",
        "after 2000 millis",
        "Requested https://api.github.com/repos/carlmw/gitlactica/commits/8b07ccd197085a2c9aac1cc04aef93750aafd49d",
        "after 3000 millis",
        "Clear interval"
      ]).to.deep.equal(messages);
    });
  });
});
