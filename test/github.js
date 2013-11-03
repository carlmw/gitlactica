var commitsData = [{ sha: 'd94709' }],
    commitData = { url: "https://api.github.com/repos/carlmw/gitlactica/commits/d94709" },
    repoData = { language: "JavaScript" },
    github = require('../lib/github'),
    subspace = { emit: function () {} },
    transport = { xhr: function () {} },
    reposList = [{ full_name: 'carlmw/gitlactica' }];

describe("github", function () {
  describe("repo", function () {
    it("fetches the repo details", function () {
      var transportMock = sinon.mock(transport);
      transportMock.expects('xhr').withArgs({
        uri: '/api/repos/carlmw/gitlactica'
      });
      github(transport, subspace).repo('carlmw/gitlactica');

      transportMock.verify();
    });

    it("triggers the repo event", function () {
      var subspaceMock = sinon.mock(subspace);
      subspaceMock.expects('emit').withArgs('repo', repoData);
      sinon.stub(transport, 'xhr').callsArgWith(1, null, {}, JSON.stringify(repoData));
      github(transport, subspace).repo('carlmw/gitlactica');

      subspaceMock.verify();
    });
  });

  describe("commits", function () {
    it("fetches a list of commits", function () {
      var transportMock = sinon.mock(transport);
      transportMock.expects('xhr').withArgs({
        uri: '/api/repos/carlmw/gitlactica/commits?since=2013-11-04T00:00:00+00:00'
      });
      github(transport, subspace).commits('carlmw/gitlactica', '2013-11-04T00:00:00+00:00');

      transportMock.verify();
    });

    it("triggers the commits event", function () {
      var subspaceMock = sinon.mock(subspace);
      subspaceMock.expects('emit').withArgs('commits', commitsData);
      sinon.stub(transport, 'xhr').callsArgWith(1, null, {}, JSON.stringify(commitsData), 'carlmw/gitlactica');
      github(transport, subspace).commits('carlmw/gitlactica', '2013-11-04T00:00:00+00:00');

      subspaceMock.verify();
    });
  });

  describe("commit", function () {
    it("fetches the commit", function () {
      var transportMock = sinon.mock(transport);
      transportMock.expects('xhr').withArgs({
        uri: '/api/repos/carlmw/gitlactica/commits/d94709'
      });
      github(transport, subspace).commit('carlmw/gitlactica', 'd94709');

      transportMock.verify();
    });

    it("triggers the commit event", function () {
      var subspaceMock = sinon.mock(subspace);
      subspaceMock.expects('emit').withArgs('commit', commitData);
      sinon.stub(transport, 'xhr').callsArgWith(1, null, {}, JSON.stringify(commitData));
      github(transport, subspace).commit('carlmw/gitlactica', 'd94709');

      subspaceMock.verify();
    });
  });

  describe("repos", function () {
    it("fetches the commit", function () {
      var transportMock = sinon.mock(transport);
      transportMock.expects('xhr').withArgs({
        uri: '/api/user/repos'
      });
      github(transport, subspace).repos();

      transportMock.verify();
    });

    it("triggers the repos event", function () {
      var subspaceMock = sinon.mock(subspace);
      subspaceMock.expects('emit').withArgs('repos', reposList);
      sinon.stub(transport, 'xhr').callsArgWith(1, null, {}, JSON.stringify(reposList));
      github(transport, subspace).repos();

      subspaceMock.verify();
    });
  });
});
