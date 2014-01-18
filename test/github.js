var github = require('../lib/github'),
    transport = { xhr: function () {} };

describe('github', function () {
  describe('repo', function () {
    it('fetches the repo details', testEndpoint(
      function () {
        return github(transport).repo('carlmw/gitlactica');
      },
      '/api/repos/carlmw/gitlactica'
    ));

    it('caches the response', function () {
      var gh = github(transport), i = 0;
      sinon.stub(transport, 'xhr', function () { return i++; });

      var a = gh.repo('carlmw/gitlactica');
      var b = gh.repo('carlmw/gitlactica');

      expect(a).to.equal(b);
    });
  });

  describe('commits', function () {
    it('fetches a list of commits', testEndpoint(
      function () {
        return github(transport).commits('carlmw/gitlactica', '2013-11-04T00:00:00+00:00');
      },
      '/api/repos/carlmw/gitlactica/commits?since=2013-11-04T00:00:00+00:00'
    ));
  });

  describe('commit', function () {
    it('fetches a commit', testEndpoint(
      function () {
        return github(transport).commit('carlmw/gitlactica', 'd94709');
      },
      '/api/repos/carlmw/gitlactica/commits/d94709'
    ));
  });

  describe('repos', function () {
    it('fetches a list of repos', testEndpoint(
      function () {
        return github(transport).repos();
      },
      '/api/user/repos?sort=pushed'
    ));
  });

  describe('events', function () {
    it('fetches a list of repos', testEndpoint(
      function () {
        return github(transport).events();
      },
      '/api/events'
    ));
  });

  function testEndpoint(exercise, expectedUrl) {
    return function () {
      var transportMock = sinon.mock(transport);
      transportMock.expects('xhr').withArgs({
        url: expectedUrl,
        type: 'json'
      }).returns('a promise');

      var req = exercise();

      transportMock.verify();
      expect(req).to.equal('a promise');
    };
  }
});
