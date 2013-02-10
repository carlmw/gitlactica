define([
  'vendor/three',
  'vendor/lodash',
  'torpedo',
  'animation/bombard',
  'animation/tractor'
], function (THREE, _, torpedo, bombard, tractor) {
  var constructor = function (ship, scene) {
    this.ship = ship;
    this.scene = scene;
  };

  constructor.prototype = {
    fire: function (planet, count) {
      var ordnance = _.times(count, torpedo);

      bombard(this.scene, this.ship, planet, ordnance);
    },
    tractor: function(planet, count) {
      var ordnance = _.times(count, torpedo);

      tractor(this.ship, planet, ordnance);
    }
  };

  function createBeam(ship) {
    var geo = new THREE.Geometry(),
        mat = new THREE.LineBasicMaterial({
          color: 0xff0000,
          linewidth: 3
        });

    geo.vertices = [ship.mesh.position, ship.pivot.position];

    return new THREE.Line(geo, mat);
  }

  return constructor;
});
