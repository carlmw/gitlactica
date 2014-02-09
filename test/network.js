var network = require('../lib/network'),
    when = require('when'),
    moment = require('moment'),
    then = function (data) {
      return {
        then: function (handler) {
          handler(data);
          return this;
        }
      };
    },
    git = {
      repo: function () {},
      commit: function () {},
      events: function () {}
    },
    SubspaceChannel = require('../lib/subspace_channel');

describe('network', function () {
  var subspace;
  beforeEach(function () {
    subspace = new SubspaceChannel();
  });

  describe('when the fetch:events event is triggered', function () {
    it('requests the most recent events', function () {
      var gitMock = sinon.mock(git);
      gitMock.expects('events').withArgs('carlmw').returns(then([]));
      network(subspace, git);
      subspace.emit('fetch:events', 'carlmw');

      gitMock.verify();
    });

    describe('when the response is received', function () {
      beforeEach(function () {
        sinon.stub(git, 'commit').returns(then({}));
        sinon.stub(git, 'repo').returns(then({}));
        sinon.stub(git, 'events').returns(then([
          {
            type: 'PushEvent',
            repo: { name: 'carlmw/gitlactica' },
            payload: {
              commits: [
                { sha: '8b07ccd197085a2c9aac1cc04aef93750aafd49d' },
                { sha: 'd94709d1942c14fe4bd06e24e9639ed30232b58e' },
                { sha: '8b07ccd197085a2c9aac1cc04aef93750aafd49d' }
              ]
            }
          },
          {
            type: 'IgnoreEvent'
          }
        ]));
        network(subspace, git);
      });

      it('pops the oldest commit and requests its details', function () {
        subspace.emit('fetch:events');

        expect(git.commit).to.have.been.calledOnce;
        expect(git.repo).to.have.been.calledOnce;
        expect(git.commit.args[0]).to.deep.equal(['carlmw/gitlactica', '8b07ccd197085a2c9aac1cc04aef93750aafd49d']);
        expect(git.repo.args[0]).to.deep.equal(['carlmw/gitlactica']);
      });

      describe('and the commit request is successful', function () {
        it('emits the commit event', function (done) {
          git.commit.returns(when({ commit: 'stuff' }));
          git.repo.returns(when({ repo: 'things' }));
          var commitSpy = sinon.spy();
          subspace.on('commit', commitSpy);
          subspace.on('commit', function () {
            expect(commitSpy).to.have.been.calledOnce;
            expect(commitSpy).to.have.been.calledWith({ commit: 'stuff' }, { repo: 'things' });
            done();
          });
          subspace.emit('fetch:events');
        });
      });

      describe('when the nextCommit event is emitted', function () {
        it('pops the oldest commit and requests its details', function () {
          subspace.emit('fetch:events');
          subspace.emit('nextCommit');

          expect(git.commit).to.have.been.calledTwice;
          expect(git.repo).to.have.been.calledTwice;
          expect(git.commit.args[1]).to.deep.equal(['carlmw/gitlactica', 'd94709d1942c14fe4bd06e24e9639ed30232b58e']);
          expect(git.repo.args[1]).to.deep.equal(['carlmw/gitlactica']);
        });

        describe('and the commit has already been played', function () {
          beforeEach(function () {
            git.events.returns(then([
              {
                type: 'PushEvent',
                repo: { name: 'carlmw/gitlactica' },
                payload: {
                  commits: [
                    { sha: '8b07ccd197085a2c9aac1cc04aef93750aafd49d' },
                    { sha: '8b07ccd197085a2c9aac1cc04aef93750aafd49d' },
                    { sha: 'd94709d1942c14fe4bd06e24e9639ed30232b58e' }
                  ]
                }
              }
            ]));
          });

          it('pops the next commit', function () {
            subspace.emit('fetch:events');
            subspace.emit('nextCommit');

            expect(git.commit.args[1]).to.deep.equal(['carlmw/gitlactica', 'd94709d1942c14fe4bd06e24e9639ed30232b58e']);
            expect(git.repo.args[1]).to.deep.equal(['carlmw/gitlactica']);
          });
        });
      });
    });
  });
});
