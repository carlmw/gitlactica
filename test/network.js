var network = require('../lib/network'),
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
      commits: function () {},
      commit: function () {},
      repos: function () {},
      events: function () {}
    },
    SubspaceChannel = require('../lib/subspace_channel');

describe('network', function () {
  var subspace;
  beforeEach(function () {
    subspace = new SubspaceChannel();
  });

  describe('when the fetch:repos event is triggered', function () {
    it('requests the list of user repos', function () {
      var gitMock = sinon.mock(git);
      gitMock.expects('repos').returns(then([]));
      network(subspace, git);
      subspace.emit('fetch:repos');

      gitMock.verify();
    });

    describe('when the request is successful', function () {
      it('emits the repos event', function () {
        sinon.stub(git, 'repos').returns(then([{ sha: '8b07cc' }]));
        var reposSpy = sinon.spy();
        subspace.on('repos', reposSpy);
        network(subspace, git);
        subspace.emit('fetch:repos');

        expect(reposSpy).to.have.been.calledWith([{ sha: '8b07cc' }]);
      });
    });
  });

  describe('when the fetch:repo event is triggered', function () {
    it('requests repo data', function () {
      var gitMock = sinon.mock(git);
      gitMock.expects('repo').withArgs('carlmw/gitlactica').returns(then({}));
      network(subspace, git);
      subspace.emit('fetch:repo', 'carlmw/gitlactica');

      gitMock.verify();
    });

    describe('when the request is successful', function () {
      it('emits the repo event', function () {
        var repoSpy = sinon.spy();
        subspace.on('repo', repoSpy);
        sinon.stub(git, 'repo').returns(then({ repo: 'stuff' }));
        network(subspace, git);
        subspace.emit('fetch:repo', 'carlmw/gitlactica');

        expect(repoSpy).to.have.been.calledWith({ repo: 'stuff' });
      });
    });
  });

  describe('when the fetch:commits event is triggered', function () {
    var clock, gitMock;
    beforeEach(function () {
      clock = sinon.useFakeTimers();
      gitMock = sinon.mock(git);
      network(subspace, git);
    });

    it('requests commits starting from the date supplied', function () {
      gitMock.expects('commits')
        .withArgs('carlmw/gitlactica', moment().subtract('days', 30).format())
        .returns(then([]));

      subspace.emit('fetch:commits', 'carlmw/gitlactica', 30);

      gitMock.verify();
    });

    describe('and the request is successful', function () {
      beforeEach(function () {
        sinon.stub(git, 'commits').returns(then([
          { sha: 'd94709d1942c14fe4bd06e24e9639ed30232b58e' },
          { sha: '8b07ccd197085a2c9aac1cc04aef93750aafd49d' }
        ]));

        subspace.emit('fetch:commits', 'carlmw/gitlactica', 30);
      });

      describe('every second', function (d) {
        it('pops the oldest commit and requests its details', function () {
          gitMock.expects('commit').withArgs('carlmw/gitlactica', '8b07ccd197085a2c9aac1cc04aef93750aafd49d').returns(then([]));
          gitMock.expects('commit').withArgs('carlmw/gitlactica', 'd94709d1942c14fe4bd06e24e9639ed30232b58e').returns(then([]));
          clock.tick(10e3);
          gitMock.verify();
        });

        describe('when the request is successful', function () {
          it('emits the commit event', function () {
            sinon.stub(git, 'commit').returns(then({ commit: 'stuff' }));

            var commitSpy = sinon.spy();
            subspace.on('commit', commitSpy);

            clock.tick(10e3);
            expect(commitSpy).to.have.been.called.once;
            expect(commitSpy).to.have.been.calledWith({ commit: 'stuff' }, 'carlmw/gitlactica');
          });
        });
      });
    });
  });

  describe('when the fetch:events event is triggered', function () {
    it('requests the most recent events', function () {
      var gitMock = sinon.mock(git);
      gitMock.expects('events').returns(then([]));
      network(subspace, git);
      subspace.emit('fetch:events');

      gitMock.verify();
    });

    describe('when the response is received', function () {
      describe('for each push event', function () {
        describe('every second', function () {
          var clock;

          beforeEach(function () {
            clock = sinon.useFakeTimers();
            sinon.stub(git, 'events').returns(then([
              {
                type: 'PushEvent',
                repo: { name: 'carlmw/gitlactica' },
                payload: {
                  commits: [
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
            sinon.stub(git, 'commit').returns(then({}));

            subspace.emit('fetch:events');

            clock.tick(10e3);

            expect(git.commit).to.have.been.calledTwice;
            expect(git.commit.args[0]).to.deep.equal(['carlmw/gitlactica', '8b07ccd197085a2c9aac1cc04aef93750aafd49d']);
            expect(git.commit.args[1]).to.deep.equal(['carlmw/gitlactica', 'd94709d1942c14fe4bd06e24e9639ed30232b58e']);
          });

          describe('and the commit request is successful', function () {
            it('emits the commit event', function () {
              sinon.stub(git, 'commit').returns(then({ commit: 'stuff' }));

              var commitSpy = sinon.spy();
              subspace.on('commit', commitSpy);

              subspace.emit('fetch:events');

              clock.tick(5e3);
              expect(commitSpy).to.have.been.calledOnce;
              expect(commitSpy).to.have.been.calledWith({ commit: 'stuff' }, 'carlmw/gitlactica');
            });
          });
        });
      });
    });
  });
});
