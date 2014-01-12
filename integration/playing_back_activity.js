/* global casper */
var x = require('casper').selectXPath;
casper.options.waitTimeout = 10000;
casper.test.begin('Playing back activity', 47, function (test) {
  var lastMessage;
  casper.start('http://localhost:8091');

  expect('Hidden beam');
  expect('Set canvas size 400x300');
  expect('Rendered template loading');
  expect('Rendered template root');

  casper.thenClick('.github-auth');

  casper.waitForUrl('/repos');

  expect('Hidden beam');
  expect('Set canvas size 400x300');
  expect('Rendered template loading');
  expect('Rendered template pick_repo');

  casper.thenClick(x('//a[span[text()="gitlactica"]]'));

  casper.waitForUrl('/repos/carlmw/gitlactica');

  expect('Hidden beam');
  expect('Set canvas size 400x300');
  expect('Rendered template loading');
  expect('Rendered template pick_interval');

  casper.thenClick(x('//a[text()="Last 7 days"]'));

  casper.waitForUrl('/repos/carlmw/gitlactica/days/7');

  expect('Hidden beam');
  expect('Set canvas size 400x300');
  expect('Rendered template loading');
  expect('Added planet carlmw/gitlactica with colour 0xf15501');
  expect('Moved planet carlmw/gitlactica to 0, 0, 0');
  expect('Revealed planet');
  expect('Rendered template playback');
  expect('Revealed repo name');
  expect('Moved camera away from planet');
  expect('Added ship carlmw');
  expect('Following ship carlmw');
  expect('Ship carlmw orbiting carlmw/gitlactica');
  expect('Chasing ship carlmw');
  expect('Following planet carlmw/gitlactica');
  expect('Added weapons to carlmw');
  expect('Shown beam');

  casper.then(function () {
    test.assertExists('.commit img[src="/carlmw_avatar.jpg"]');
    test.assertSelectorHasText('.commit .message', 'Update the codes');
  });

  expect('Launched torpedo with colour 0xf15501');
  expect('Launched torpedo with colour 0xf15501');
  expect('Detonated torpedo');
  expect('Hidden beam');
  expect('Added ship bobson');
  expect('Following ship bobson');
  expect('Ship bobson orbiting carlmw/gitlactica');
  expect('Chasing ship bobson');
  expect('Following planet carlmw/gitlactica');
  expect('Added weapons to bobson');
  expect('Shown beam');

  casper.then(function () {
    test.assertExists('.commit img[src="/bobson_avatar.jpg"]');
    test.assertSelectorHasText('.commit .message', 'Revert the codes');
  });

  expect('Launched torpedo with colour 0x3581ba');
  expect('Launched torpedo with colour 0x3581ba');
  expect('Detonated torpedo');
  expect('Hidden beam');

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
