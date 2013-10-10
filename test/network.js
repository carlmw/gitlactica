var network = require('../lib/network'),
    moment = require('moment'),
    git = {
      repo: function () {},
      commits: function () {},
      commit: function () {}
    },
    SubspaceChannel = require('../lib/subspace_channel');

describe("network", function () {
  var subspace;
  beforeEach(function () {
    subspace = new SubspaceChannel();
  });

  it("requests repo details", function () {
    var gitMock = sinon.mock(git);
    gitMock.expects('repo').withArgs('carlmw/gitlactica');

    network('carlmw/gitlactica', subspace, git);

    gitMock.verify();
  });

  describe("when the repo event is triggered", function () {
    beforeEach(function () {
      network('carlmw/gitlactica', subspace, git);
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

        network('carlmw/gitlactica', subspace, git);
        subspace.emit('commits', [
          { sha: 'd94709d1942c14fe4bd06e24e9639ed30232b58e' },
          { sha: '8b07ccd197085a2c9aac1cc04aef93750aafd49d' }
        ]);
        clock.tick(1e3);
        gitMock.expects('commit').withArgs('carlmw/gitlactica', '8b07ccd197085a2c9aac1cc04aef93750aafd49d');
        clock.tick(1e3);
        gitMock.verify();
      });
    });
  });
});
