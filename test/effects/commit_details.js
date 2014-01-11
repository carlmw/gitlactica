var commitDetails = require('../../lib/effects/commit_details'),
    markup = '',
    renderer = {
      html: function (selector, html) {
        if (selector === '#current-commit') markup = html;
      }
    };

describe('commitDetails', function () {
  afterEach(function () {
    markup = '';
  });
  
  it('renders commit details', function () {
    commitDetails({}, renderer, 'carlmw', 'Added stuff', '/avatar.png', function () {});

    expect(markup).to.contain('<p class="message">Added stuff</p>');
    expect(markup).to.contain('<img src="/avatar.png" alt="Avatar for carlmw" />');
    expect(markup).to.contain('<h2>carlmw</h2>');
  });

  describe('when the commit message is very long', function () {
    it('is truncated to 200 characters', function () {
      commitDetails({}, renderer, 'carlmw', new Array(300).join('a'), '/avatar/png', function () {});
      
      expect(markup).to.contain('<p class="message">' + new Array(201).join('a') + '...</p>');
    });
  });

  it('calls next', function () {
    var nextMock = sinon.mock();

    commitDetails({}, renderer, 'carlmw', 'Stuff', '/avatar.png', nextMock);

    nextMock.verify();
  });
});
