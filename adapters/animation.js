var TWEEN = require('tween.js'),
    window = require('../lib/util').global(),
    raf = require('raf-component'),
    _ = require('lodash'),
    updaters = {};

module.exports = {
  tween: function (from, to, duration, onUpdate, next) {
    var tween = new TWEEN.Tween(from)
      .to(to, duration)
      .onUpdate(onUpdate);

    if (next) tween.onComplete(next);

    return tween;
  },
  update: function (delta) {
    _.values(updaters).forEach(function (fn) { fn(delta); });
  },
  registerUpdater: function (name, fn) {
    updaters[name] = fn;
  },
  unregisterUpdater: function (name) {
    delete updaters[name];
  },
  raf: function (fn) {
    raf(fn);
  },
  wait: function (millis, fn) {
    window.setTimeout(fn, millis);
  }
};
