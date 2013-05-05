var Mousetrap = require('mousetrap'),
    fakeCommits = require('./fake_commits'),
    fakePlanets = require('./fake_planets');

module.exports = keyboardNavigation;

function keyboardNavigation(channel, client) {
  Mousetrap.bind('left', function () {
    channel.emit('previous:planet');
  });

  Mousetrap.bind('right', function () {
    channel.emit('next:planet');
  });

  Mousetrap.bind('up', function () {
    fakeCommits(client);
  });

  Mousetrap.bind('down', function () {
    fakePlanets(client);
  });
}
