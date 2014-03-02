module.exports = function (renderer, colour, THREE) {
  renderer.addPlanet('carlmw/gitlactica', colour.of('JavaScript'));
  var target = renderer.planetMesh('carlmw/gitlactica');

  renderer.moveCamera(6000, 0, 0, 0.5);
  renderer.lookTo(0, 0, 0, 0.5);

  trackball(THREE);

  var trackballControls = new THREE.TrackballControls(renderer.camera);

  var clock = new THREE.Clock();
  function loop () {
    window.requestAnimationFrame(loop);
    trackballControls.update(clock.getDelta());
  }
  loop();
};
