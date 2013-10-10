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
});
