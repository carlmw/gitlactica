var universe = require('../lib/universe'),
    moment = require('moment'),
    renderer = {
      addPlanet: function () {},
      movePlanet: function () {},
      lookAt: function () {}
    },
    github = {
      repo: function () {},
      commits: function () {}
    },
    SubspaceChannel = require('../lib/subspace_channel');

describe("universe", function () {
  it("requests repo details", function () {
    var ghMock = sinon.mock(github),
        subspace = new SubspaceChannel();
    ghMock.expects('repo').withArgs('carlmw/gitlactica');

    universe('carlmw/gitlactica', github, subspace, renderer);

    ghMock.verify();
  });

  describe("when the repo event is triggered", function () {
    var channel;
    beforeEach(function () {
      channel = new SubspaceChannel();
      universe('carlmw/gitlactica', github, channel, renderer);
    });

    it("renders a planet", function () {
      var rendererMock = sinon.mock(renderer);
      rendererMock.expects('addPlanet').withArgs('carlmw/gitlactica', 0xffffff);

      channel.emit('repo', { full_name: 'carlmw/gitlactica' });

      rendererMock.verify();
    });

    it("moves the planet into position", function () {
      var rendererMock = sinon.mock(renderer);
      rendererMock.expects('movePlanet').withArgs('carlmw/gitlactica', 0, 0, 0);

      channel.emit('repo', { full_name: 'carlmw/gitlactica' });

      rendererMock.verify();
    });

    it("requests the commits for the past month", function () {
      var ghMock = sinon.mock(github);
      ghMock.expects('commits').withArgs('carlmw/gitlactica', moment().startOf('month').format());

      channel.emit('repo', { full_name: 'carlmw/gitlactica' });

      ghMock.verify();
    });
  });
});
