(function (global) {
  var intervals = [];

  global.setInterval = function (fn, millis) {
    var interval = intervals.length,
        i = 1;
    intervals.push(fn);
    log("Set interval " + interval + " at " + millis);
    function loop () {
      if (intervals.indexOf(fn) !== -1) {
        log("after " + (i * millis) + " millis");
        i++;
        fn();
        loop();
      }
    }
    loop();
  };

  global.clearInterval = function (interval) {
    intervals.pop();
    log("Clear interval");
  };
})('undefined' !== typeof window ? window : global);
