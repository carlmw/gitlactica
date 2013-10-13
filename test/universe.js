var universe = require('../lib/universe'),
    moment = require('moment'),
    renderer = {
      addPlanet: function () {},
      movePlanet: function () {},
      lookAt: function () {}
    },
    effectsQueue = {
      push: function () {}
    },
    colour = {
      of: function () {}
    },
    SubspaceChannel = require('../lib/subspace_channel');

describe("universe", function () {
  var subspace;
  beforeEach(function () {
    subspace = new SubspaceChannel();
    universe(subspace, colour, effectsQueue, renderer);
  });
  describe("when the repo event is triggered", function () {
    it("renders a planet", function () {
      sinon.stub(colour, 'of').withArgs('JavaScript').returns(0xff0000);

      var rendererMock = sinon.mock(renderer);
      rendererMock.expects('addPlanet').withArgs('carlmw/gitlactica', 0xff0000);

      subspace.emit('repo', { full_name: 'carlmw/gitlactica', language: 'JavaScript' });

      rendererMock.verify();
    });

    it("moves the planet into position", function () {
      var rendererMock = sinon.mock(renderer);
      rendererMock.expects('movePlanet').withArgs('carlmw/gitlactica', 0, 0, 0);

      subspace.emit('repo', { full_name: 'carlmw/gitlactica' });

      rendererMock.verify();
    });
  });

  describe("when the commit event is triggered", function () {
    it("pushes the ship animations onto the queue", function () {
      var effectsMock = sinon.mock(effectsQueue);

      effectsMock.expects('push').withArgs('addShip', 'carlmw');
      effectsMock.expects('push').withArgs('orbitShip', 'carlmw', 0, 0, 0);
      effectsMock.expects('push').withArgs('fireWeapons', 'carlmw', 0x0000ff, 14, 4);
      effectsMock.expects('push').withArgs('fireWeapons', 'carlmw', 0x0000ff, 7, 8);

      subspace.emit('commit', {
        committer: { login: 'carlmw' },
        files: [{
          filename: 'stuff.js',
          additions: 14,
          deletions: 4,
          changes: 18,
        },
        {
          filename: 'styles.css',
          additions: 7,
          deletions: 8,
          changes: 15,
        }]
      });

      effectsMock.verify();
    });
  });
});
