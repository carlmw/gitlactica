var universe = require('../lib/universe'),
    moment = require('moment'),
    effectsQueue = {
      push: function () {}
    },
    colour = {
      of: function (identifier) {}
    },
    SubspaceChannel = require('../lib/subspace_channel');

// TODO Make these tests more granular
describe("universe", function () {
  var subspace;
  beforeEach(function () {
    subspace = new SubspaceChannel();
    universe(subspace, colour, effectsQueue);
  });
  describe("when the repo event is triggered", function () {
    it("renders a planet", function () {
      sinon.stub(colour, 'of').withArgs('JavaScript').returns(0xff0000);
      var effectsMock = sinon.mock(effectsQueue);
      effectsMock.expects('push').withArgs('addPlanet', 'carlmw/gitlactica', 0xff0000);
      effectsMock.expects('push').withArgs('movePlanet', 'carlmw/gitlactica', 0, 0, 0);
      effectsMock.expects('push').withArgs('revealPlanet');

      subspace.emit('repo', { full_name: 'carlmw/gitlactica', language: 'JavaScript' });

      effectsMock.verify();
    });
  });

  describe("when the commit event is triggered", function () {
    it("pushes the ship animations onto the queue", function () {
      sinon.stub(colour, 'of');
      colour.of.withArgs('.js').returns(0xffff00);
      colour.of.withArgs('.css').returns(0x0000ff);

      var effectsMock = sinon.mock(effectsQueue);

      effectsMock.expects('push').withArgs('addShip', 'carlmw');
      effectsMock.expects('push').withArgs('followShip', 'carlmw');
      effectsMock.expects('push').withArgs('orbitShip', 'carlmw', 0, 0, 0);
      effectsMock.expects('push').withArgs('commitDetails', 'carlmw', 'Add stuff', '/carlmw_avatar.jpg');
      effectsMock.expects('push').withArgs('fireWeapons', 'carlmw', 0xffff00, 14, 4);
      effectsMock.expects('push').withArgs('fireWeapons', 'carlmw', 0x0000ff, 7, 8);

      subspace.emit('commit', {
        committer: { login: 'carlmw', avatar_url: '/carlmw_avatar.jpg' },
        commit: { message: 'Add stuff' },
        files: [
          { filename: 'stuff.js', additions: 14, deletions: 4, changes: 18 },
          { filename: 'styles.css', additions: 7, deletions: 8, changes: 15 }
        ]
      });

      effectsMock.verify();
    });

    describe("and the ship already exists", function () {
      it("looks at the ship", function () {
        sinon.stub(colour, 'of');
        colour.of.withArgs('.js').returns(0xffff00);

        subspace.emit('commit', {
          committer: { login: 'carlmw', avatar_url: '/carlmw_avatar2.jpg' },
          commit: { message: 'Ignore me' },
          files: [{ filename: 'stuff.js', additions: 14, deletions: 4, changes: 18 }]
        });

        var effectsMock = sinon.mock(effectsQueue);

        effectsMock.expects('push').withArgs('followShip', 'carlmw');
        effectsMock.expects('push').withArgs('commitDetails', 'carlmw', 'Remove stuff', '/carlmw_avatar.jpg');
        effectsMock.expects('push').withArgs('fireWeapons', 'carlmw', 0xffff00, 14, 4);

        subspace.emit('commit', {
          committer: { login: 'carlmw', avatar_url: '/carlmw_avatar.jpg' },
          commit: { message: 'Remove stuff' },
          files: [{ filename: 'more.js', additions: 14, deletions: 4, changes: 18 }]
        });

        effectsMock.verify();
      });
    });
  });
});
