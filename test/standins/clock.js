/* global window */
(function (global) {
  var intervals = [];

  global.setInterval = function (fn, millis) {
    var interval = intervals.length,
        i = 1;
    intervals.push(fn);
    function loop () {
      if (intervals.indexOf(fn) !== -1) {
        i++;
        fn();
        loop();
      }
    }
    loop();
  };

  global.clearInterval = function (interval) {
    intervals.pop();
  };
})('undefined' !== typeof window ? window : global);
