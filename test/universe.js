var universe = require('../lib/universe'),
    moment = require('moment'),
    renderer = {
      addPlanet: function () {},
      movePlanet: function () {},
      lookAt: function () {}
    },
    github = {
      repo: function () {},
      commits: function () {},
      commit: function () {}
    },
    SubspaceChannel = require('../lib/subspace_channel');

describe("universe", function () {
  var channel;
  beforeEach(function () {
    channel = new SubspaceChannel();
  });

  it("requests repo details", function () {
    var ghMock = sinon.mock(github);
    ghMock.expects('repo').withArgs('carlmw/gitlactica');

    universe('carlmw/gitlactica', github, channel, renderer);

    ghMock.verify();
  });

  describe("when the repo event is triggered", function () {
    beforeEach(function () {
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

  describe("when the commits event is triggered", function () {
    describe("every second", function () {
      it("pops a commit and requests its details", function () {
        var clock = sinon.useFakeTimers();
        var ghMock = sinon.mock(github);
        ghMock.expects('commit').withArgs('carlmw/gitlactica', 'd94709d1942c14fe4bd06e24e9639ed30232b58e');

        universe('carlmw/gitlactica', github, channel, renderer);
        channel.emit('commits', [
          { sha: 'd94709d1942c14fe4bd06e24e9639ed30232b58e' },
          { sha: '8b07ccd197085a2c9aac1cc04aef93750aafd49d' }
        ]);
        clock.tick(1e3);
        ghMock.expects('commit').withArgs('carlmw/gitlactica', '8b07ccd197085a2c9aac1cc04aef93750aafd49d');
        clock.tick(1e3);
        ghMock.verify();
      });
    });
  });
});
