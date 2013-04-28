var methods = tweenStub();

module.exports = {
  Tween: function () {
    return methods;
  },
  methods: methods
};

function tweenStub () {
  var api = {},
      methods = ['to', 'onStart', 'onUpdate', 'onComplete', 'start', 'stop'];

  methods.forEach(function (k) {
    this[k] = function () { return api; };
  }, api);

  return api;
}
