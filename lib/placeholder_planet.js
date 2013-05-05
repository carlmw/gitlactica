var Planet = require('./planet');

module.exports = function (scene, subspace) {
  var javascript = new Planet(scene, '', 'JavaScript'),
      ruby = new Planet(scene, '', 'Ruby'),
      python = new Planet(scene, '', 'Python');

  javascript.scale(0.4);
  ruby.scale(0.6);
  javascript.pivot.position.set(800, -800, 1500);
  ruby.pivot.position.set(-700, 250, 1500);
  python.pivot.position.set(500, 700, 1500);

  subspace.once('show:planet', function () {
    javascript.remove();
    python.remove();
    ruby.remove();
  });
};
