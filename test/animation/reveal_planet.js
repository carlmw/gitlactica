describe('animation/revealPlanet', function () {
  var tween = require('tween'),
      planetPosition = { x: 100, y: 100 },
      camera = { position: { x: 200, y: 200, z: 100, c: 0 } },
      revealPlanet = require('../../lib/animation/reveal_planet');

  it("starts from the cameras current position", function () {
    sinon.spy(tween, 'Tween');
    revealPlanet(camera, planetPosition);

    tween.Tween.should.have.been.calledWith(camera.position);
  });

  it("tweens to the planet's x + y", function () {
    var tweenMock = sinon.mock(tween.methods);
    tweenMock.expects('to')
      .withArgs({ x: 100, y: 100, c: 2 }, 6e3)
      .returns(tween.methods);
    revealPlanet(camera, planetPosition);

    tweenMock.verify();
  });

  it("starts the animation", function () {
    var tweenMock = sinon.mock(tween.methods);
    tweenMock.expects('start');
    revealPlanet(camera, planetPosition);

    tweenMock.verify();
  });

  it("returns the tween instance", function () {
    var returnStub = sinon.stub(),
        tweenStub = sinon.stub(tween.methods, 'start')
          .returns(returnStub);

    revealPlanet(camera, planetPosition).should.equal(returnStub);
  });
});
