/* global casper */
var x = require('casper').selectXPath;
casper.options.waitTimeout = 10000;
casper.test.begin('Playing back activity', 27, function (test) {
  var lastMessage;
  casper.start('http://localhost:8091');

  expect('Hidden beam');
  expect('Set canvas size 400x300');
  expect('Rendered template /');
  casper.thenClick(x('//a[text()="Connect to GitHub"]'));

  casper.waitForSelector(x('//a[text()="gitlactica"]'), function () {
    test.assertUrlMatch('/repos', 'Redirected to /repos');
  });

  expect('Hidden beam');
  expect('Set canvas size 400x300');
  expect('Rendered template /repos');

  casper.thenClick(x('//a[text()="gitlactica"]'));

  casper.waitForUrl('/repos/carlmw/gitlactica');

  expect('Hidden beam');
  expect('Set canvas size 400x300');
  expect('Added planet carlmw/gitlactica with colour 0xf15501');
  expect('Moved planet carlmw/gitlactica to 0, 0, 0');
  expect('Looked at 0, 0, 0');
  expect('Rendered template /repo');
  expect('Added ship carlmw');
  expect('Ship carlmw orbiting 0, 0, 0');
  expect('Added weapons to carlmw');
  expect('Shown beam');
  expect('Launched torpedo with colour 0xf15501');
  expect('Hidden beam');
  expect('Launched torpedo with colour 0xf15501');
  expect('Added ship bobson');
  expect('Ship bobson orbiting 0, 0, 0');
  expect('Added weapons to bobson');
  expect('Shown beam');
  expect('Launched torpedo with colour 0x3581ba');
  expect('Hidden beam');
  expect('Launched torpedo with colour 0x3581ba');

  casper.run(function () {
    test.done();
  });

  function expect(msg) {
    casper.waitFor(loggedMessage, assertMessage(msg));
  }

  function assertMessage(expectedMessage) {
    return function () {
      test.assertEquals(lastMessage, expectedMessage, expectedMessage);
    };
  }

  function loggedMessage () {
    return lastMessage = casper.evaluate(function () {
      return log.messages.shift();
    });
  }
});
