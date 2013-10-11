var TWEEN = require('tween.js');

module.exports = {
  tween: function (from, to, duration, onUpdate, next) {
    var tween = new TWEEN.Tween(from)
      .to(to, duration)
      .onUpdate(onUpdate);

    if (next) tween.onComplete(next);

    return tween;
  }
};
