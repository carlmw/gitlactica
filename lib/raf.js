(function (define, window) {
  "use strict";

  var raf = window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback, element) {
      window.setTimeout(callback, 1000 / 60 );
    };

  define(function () {
    return raf; 
  });

}(define, window));
