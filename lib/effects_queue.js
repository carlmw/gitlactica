var queue = require('queue-async');

module.exports = function (effects, animation, renderer) {
  var q = queue(1);

  return {
    push: function (effect) {
      var args = Array.prototype.slice.call(arguments, 1);
      q.defer.apply(q, [effects[effect], animation, renderer].concat(args));
    }
  };
};
