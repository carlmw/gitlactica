var TWEEN = require('tween.js'),
    window = require('../lib/util').global(),
    raf = require('raf-component');

module.exports = {
  tween: function (from, to, duration, onUpdate, next) {
    var tween = new TWEEN.Tween(from)
      .to(to, duration)
      .onUpdate(onUpdate);

    if (next) tween.onComplete(next);

    return tween;
  },
  raf: function (fn) {
    raf(fn);
  },
  wait: function (millis, fn) {
    window.setTimeout(fn, millis);
  }
};
