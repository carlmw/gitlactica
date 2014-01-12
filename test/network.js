var network = require('../lib/network'),
    moment = require('moment'),
    git = {
      repo: function () {},
      commits: function () {},
      commit: function () {},
      repos: function () {}
    },
    SubspaceChannel = require('../lib/subspace_channel');

describe("network", function () {
  var subspace;
  beforeEach(function () {
    subspace = new SubspaceChannel();
  });

  describe("when the commits event is triggered", function () {
    describe("every second", function () {
      it("pops a the oldest commit and requests its details", function () {
        var clock = sinon.useFakeTimers(),
            gitMock = sinon.mock(git);
        gitMock.expects('commit').withArgs('carlmw/gitlactica', '8b07ccd197085a2c9aac1cc04aef93750aafd49d');

        network(subspace, git);
        subspace.emit('commits', [
          { sha: 'd94709d1942c14fe4bd06e24e9639ed30232b58e' },
          { sha: '8b07ccd197085a2c9aac1cc04aef93750aafd49d' }
        ], 'carlmw/gitlactica');
        clock.tick(5e3);
        gitMock.expects('commit').withArgs('carlmw/gitlactica', 'd94709d1942c14fe4bd06e24e9639ed30232b58e');
        clock.tick(5e3);
        gitMock.verify();
      });
    });
  });

  describe("when the fetch:repos event is triggered", function () {
    it("requests the list of user repos", function () {
      var gitMock = sinon.mock(git);
      gitMock.expects('repos');
      network(subspace, git);
      subspace.emit('fetch:repos');

      gitMock.verify();
    });
  });

  describe("when the fetch:repo event is triggered", function () {
    it("requests repo data", function () {
      var gitMock = sinon.mock(git);
      gitMock.expects('repo').withArgs('carlmw/gitlactica');
      network(subspace, git);
      subspace.emit('fetch:repo', 'carlmw/gitlactica');

      gitMock.verify();
    });
  });

  describe("when the fetch:commits event is triggered", function () {
    it("requests commits starting from the day supplied", function () {
      var gitMock = sinon.mock(git);
      gitMock.expects('commits').withArgs('carlmw/gitlactica', moment().subtract('days', 30).format());
      network(subspace, git);
      subspace.emit('fetch:commits', 'carlmw/gitlactica', 30);

      gitMock.verify();
    });
  });
});
