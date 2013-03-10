var Mousetrap = require('mousetrap');

module.exports = keyboardNavigation;

function keyboardNavigation(channel) {
  Mousetrap.bind('left', function () {
    channel.emit('previous:planet');
  });

  Mousetrap.bind('right', function () {
    channel.emit('next:planet');
  });
}
