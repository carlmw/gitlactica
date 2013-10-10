var universe = require('../lib/universe'),
    moment = require('moment'),
    renderer = {
      addPlanet: function () {},
      movePlanet: function () {},
      lookAt: function () {}
    },
    SubspaceChannel = require('../lib/subspace_channel');

describe("universe", function () {
  describe("when the repo event is triggered", function () {
    var subspace;
    beforeEach(function () {
      subspace = new SubspaceChannel();
      universe(subspace, renderer);
    });

    it("renders a planet", function () {
      var rendererMock = sinon.mock(renderer);
      rendererMock.expects('addPlanet').withArgs('carlmw/gitlactica', 0xffffff);

      subspace.emit('repo', { full_name: 'carlmw/gitlactica' });

      rendererMock.verify();
    });

    it("moves the planet into position", function () {
      var rendererMock = sinon.mock(renderer);
      rendererMock.expects('movePlanet').withArgs('carlmw/gitlactica', 0, 0, 0);

      subspace.emit('repo', { full_name: 'carlmw/gitlactica' });

      rendererMock.verify();
    });
  });
});
