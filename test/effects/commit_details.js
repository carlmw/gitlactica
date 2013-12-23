var commitDetails = require('../../lib/effects/commit_details'),
    renderer = {
      document: {
        getElementById: function () { return {}; }
      }
    };

describe('commitDetails', function () {
  it('renders commit details', function () {
    var el = {};
    sinon.stub(renderer.document, 'getElementById').withArgs('current-commit').returns(el);

    commitDetails({}, renderer, 'carlmw', 'Added stuff', '/avatar.png', function () {});

    expect(el.innerHTML).to.contain('<p class="message">Added stuff</p>');
    expect(el.innerHTML).to.contain('<img src="/avatar.png" alt="Avatar for carlmw" />');
    expect(el.innerHTML).to.contain('<h2>carlmw</h2>');
  });

  it('calls next', function () {
    var nextMock = sinon.mock();

    commitDetails({}, renderer, 'carlmw', 'Stuff', '/avatar.png', nextMock);

    nextMock.verify();
  });
});
