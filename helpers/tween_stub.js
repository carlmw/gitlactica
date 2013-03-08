module.exports = TweenStandin;

function TweenStandin () {
  var api = {};
  
  api.methods = tweenStub();
  api.Tween = function () {
    return api.methods;
  };

  return api;
}

function tweenStub () {
  var api = {},
      methods = ['to', 'onStart', 'onUpdate', 'onComplete', 'start', 'stop'];

  methods.forEach(function (k) {
    this[k] = function () { return api; };
  }, api);

  return api;
}
