var repoDetails = require('../../lib/effects/repo_details'),
    markup = '',
    renderer = {
      html: function (selector, html) {
        if (selector === '#ui') markup = html;
      }
    };

describe('repoDetails', function () {
  afterEach(function () {
    markup = '';
  });
  
  it('renders repo details', function () {
    repoDetails({}, renderer, 'carlmw/gitlactica', function () {});

    expect(markup).to.equal('<h1 class="repo visible">carlmw/gitlactica</h1>');
  });

  it('calls next', function () {
    var nextMock = sinon.mock();

    repoDetails({}, renderer, 'carlmw/gitlactica', nextMock);

    nextMock.verify();
  });
});
