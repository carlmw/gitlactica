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

  describe("when the repo event is triggered", function () {
    beforeEach(function () {
      network(subspace, git);
    });

    it("requests the commits for the past month", function () {
      var gitMock = sinon.mock(git);
      gitMock.expects('commits').withArgs('carlmw/gitlactica', moment().startOf('month').format());

      subspace.emit('repo', { full_name: 'carlmw/gitlactica' });

      gitMock.verify();
    });
  });

  describe("when the commits event is triggered", function () {
    describe("every second", function () {
      it("pops a commit and requests its details", function () {
        var clock = sinon.useFakeTimers(),
            gitMock = sinon.mock(git);
        gitMock.expects('commit').withArgs('carlmw/gitlactica', 'd94709d1942c14fe4bd06e24e9639ed30232b58e');

        network(subspace, git);
        subspace.emit('commits', [
          { sha: 'd94709d1942c14fe4bd06e24e9639ed30232b58e' },
          { sha: '8b07ccd197085a2c9aac1cc04aef93750aafd49d' }
        ], 'carlmw/gitlactica');
        clock.tick(5e3);
        gitMock.expects('commit').withArgs('carlmw/gitlactica', '8b07ccd197085a2c9aac1cc04aef93750aafd49d');
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
      gitMock.expects('repo', 'carlmw/gitlactica');
      network(subspace, git);
      subspace.emit('fetch:repo', 'carlmw/gitlactica');

      gitMock.verify();
    });
  });
});
