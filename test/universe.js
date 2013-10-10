var universe = require('../lib/universe'),
    renderer = {
      addPlanet: function () {},
      movePlanet: function () {},
      lookAt: function () {}
    },
    github = {
      repo: function () {}
    },
    SubspaceChannel = require('../lib/subspace_channel');

describe("universe", function () {
  it("requests repo details", function () {
    var ghMock = sinon.mock(github),
        subspace = new SubspaceChannel();
    ghMock.expects('repo').withArgs('carlmw/gitlactica', subspace);

    universe('carlmw/gitlactica', github, subspace, renderer);

    ghMock.verify();
  });

  it("renders a planet", function () {
    var rendererMock = sinon.mock(renderer),
        channel = new SubspaceChannel();
    rendererMock.expects('addPlanet').withArgs('carlmw/gitlactica', 0xffffff);

    universe('carlmw/gitlactica', github, channel, renderer);
    channel.emit('repo', { full_name: 'carlmw/gitlactica' });

    rendererMock.verify();
  });

  it("moves the planet into position", function () {
    var rendererMock = sinon.mock(renderer),
        channel = new SubspaceChannel();
    rendererMock.expects('movePlanet').withArgs('carlmw/gitlactica', 0, 0, 0);

    universe('carlmw/gitlactica', github, channel, renderer);
    channel.emit('repo', { full_name: 'carlmw/gitlactica' });

    rendererMock.verify();
  });
});
