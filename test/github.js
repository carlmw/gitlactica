var commitsJSON = JSON.stringify([
      { sha: 'd94709d1942c14fe4bd06e24e9639ed30232b58e' },
      { sha: '8b07ccd197085a2c9aac1cc04aef93750aafd49d' }
    ]);


var github = require('../lib/github'),
    subspace = { emit: function () {} },
    transport = { xhr: function () {} };

describe("github", function () {
  describe("repo", function () {
    it("fetches the repo details", function () {
      var transportMock = sinon.mock(transport);
      transportMock.expects('xhr').withArgs({
        uri: 'https://api.github.com/repos/carlmw/gitlactica'
      });
      github(transport, subspace).repo('carlmw/gitlactica');

      transportMock.verify();
    });

    it("triggers the repo event", function () {
      var subspaceMock = sinon.mock(subspace);
      subspaceMock.expects('emit').withArgs('repo', { language: "JavaScript" });
      sinon.stub(transport, 'xhr').callsArgWith(1, null, {}, '{"language":"JavaScript"}');
      github(transport, subspace).repo('carlmw/gitlactica');

      subspaceMock.verify();
    });
  });

  describe("commits", function () {
    it("fetches a list of commits", function () {
      var transportMock = sinon.mock(transport);
      transportMock.expects('xhr').withArgs({
        uri: 'https://api.github.com/repos/carlmw/gitlactica/commits?since=2013-11-04T00:00:00+00:00'
      });
      github(transport, subspace).commits('carlmw/gitlactica', '2013-11-04T00:00:00+00:00');

      transportMock.verify();
    });

    it("triggers the commits event", function () {
      var subspaceMock = sinon.mock(subspace);
      subspaceMock.expects('emit').withArgs('commits', JSON.parse(commitsJSON));
      sinon.stub(transport, 'xhr').callsArgWith(1, null, {}, commitsJSON);
      github(transport, subspace).commits('carlmw/gitlactica', '2013-11-04T00:00:00+00:00');

      subspaceMock.verify();
    });
  });
});
