var revealPlanet = require('../../lib/effects/reveal_planet'),
    renderer = {
      lookTo: function () {},
      addClass: function () {},
      moveCamera: function () {}
    },
    animation = {
      wait: function () {}
    };

// TODO make global.log something local
global.log = function () {};

describe('revealPlanet', function () {
  it('pans the camera to reveal the planet', function () {
    var rendererMock = sinon.mock(renderer);
    rendererMock.expects('lookTo').withArgs(0, 1500, 0, 0.04);

    revealPlanet(animation, renderer, function () {});

    rendererMock.verify();
  });

  it('displays the repo name', function () {
    var rendererMock = sinon.mock(renderer);
    rendererMock.expects('addClass').withArgs('.repo', 'visible');
    sinon.stub(animation, 'wait').withArgs(0).callsArg(1);

    revealPlanet(animation, renderer, function () {});

    rendererMock.verify();
  });

  describe('after 6 seconds', function () {
    it('moves the camera away from the planet', function () {
      var rendererMock = sinon.mock(renderer);
      rendererMock.expects('lookTo');
      rendererMock.expects('moveCamera').withArgs(6000, -4000, 1000, 0.01);
      rendererMock.expects('lookTo').withArgs(0, 0, 0, 0.01);
      sinon.stub(animation, 'wait').withArgs(6e3).callsArg(1);

      revealPlanet(animation, renderer, function () {});

      rendererMock.verify();
    });
  });

  describe('after 12 seconds', function () {
    it('completes the effect', function () {
      var nextMock = sinon.mock();
      sinon.stub(animation, 'wait').withArgs(12e3).callsArg(1);

      revealPlanet(animation, renderer, nextMock);

      nextMock.verify();
    });
  });
});
