module.exports = {
  tween: function (from, to, duration, onUpdate, next) {
    var chains = [];
    var inst = {
      start: function () {
        if (this._onStart) this._onStart;
        onUpdate.call(from);
        log('Animated for ' + duration);
        onUpdate.call(to);
        if (next) next();
        chains.forEach(function (chain) {
          chain.start();
        });
        return inst;
      },
      chain: function (tween) {
        chains.push(tween);
        return inst;
      },
      repeat: function () {
        return inst;
      },
      onStart: function (fn) {
        this._onStart = fn;
        return inst;
      }
    };

    return inst;
  }
};
