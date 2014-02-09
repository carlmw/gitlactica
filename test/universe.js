var universe = require('../lib/universe'),
    moment = require('moment'),
    effectsQueue = function () {
      return q;
    },
    q = {
      push: function () {}
    },
    colour = {
      of: function () {}
    },
    SubspaceChannel = require('../lib/subspace_channel');

// TODO Make these tests more granular
describe("universe", function () {
  var subspace;
  beforeEach(function () {
    sinon.stub(colour, 'of');
    colour.of.withArgs('JavaScript').returns(0x00ff00);
    colour.of.withArgs('.js').returns(0xffff00);
    colour.of.withArgs('.css').returns(0x0000ff);
    subspace = new SubspaceChannel();
    universe(subspace, colour, effectsQueue);
  });

  describe("when the commit event is triggered", function () {
    it("pushes the animations onto the queue", function () {
      var effectsMock = sinon.mock(q);

      effectsMock.expects('push').withArgs('addPlanet', 'carlmw/gitlactica', 0x00ff00);
      effectsMock.expects('push').withArgs('follow', 'planet', 'carlmw/gitlactica');
      effectsMock.expects('push').withArgs('repoDetails', 'carlmw/gitlactica');
      effectsMock.expects('push').withArgs('addShip', 'carlmw');
      effectsMock.expects('push').withArgs('follow', 'ship', 'carlmw');
      effectsMock.expects('push').withArgs('orbitShip', 'carlmw', 'carlmw/gitlactica');
      effectsMock.expects('push').withArgs('commitDetails', 'carlmw', 'Add stuff', '/carlmw_avatar.jpg');
      effectsMock.expects('push').withArgs('chase', 'carlmw');
      effectsMock.expects('push').withArgs('follow', 'planet', 'carlmw/gitlactica');
      effectsMock.expects('push').withArgs('fireWeapons', 'carlmw', 'carlmw/gitlactica', 0xffff00, 5, 4);
      effectsMock.expects('push').withArgs('fireWeapons', 'carlmw', 'carlmw/gitlactica', 0x0000ff, 4, 3);
      effectsMock.expects('push').withArgs('nextCommit');

      subspace.emit('commit', {
        committer: { login: 'carlmw', avatar_url: '/carlmw_avatar.jpg' },
        commit: { message: 'Add stuff' },
        files: [
          { filename: 'stuff.js', additions: 5, deletions: 4, changes: 9 },
          { filename: 'styles.css', additions: 4, deletions: 3, changes: 7 }
        ]
      }, { full_name: 'carlmw/gitlactica', language: 'JavaScript' });

      effectsMock.verify();
    });

    describe("when there are a lot of changes in a commit", function () {
      it("fires a change bomb", function () {
        sinon.spy(q, 'push');

        subspace.emit('commit', {
          committer: { login: 'carlmw', avatar_url: '/carlmw_avatar.jpg' },
          commit: { message: 'Change bomb' },
          files: [
            { filename: 'stuff.js', changes: 11 },
          ]
        }, { full_name: 'carlmw/gitlactica', language: 'JavaScript' });

        expect(q.push).to.have.been.calledWith('fireChangeBomb', 'carlmw', 'carlmw/gitlactica', 0xffff00);
        expect(q.push).not.to.have.been.calledWith('fireWeapons');
      });
    });
  });
});
