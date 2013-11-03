var renderTemplate = require('../lib/render_template');

describe('renderTemplate', function () {
  var el,
      renderer,
      templates = {
        '/': function () {},
        repos: function () {
          return '<strong>REPO</strong>';
        }
      },
      subject;

  beforeEach(function () {
    el = {};
    renderer = renderTemplate(templates, el);
  });

  it("updates the element with the rendered template", function () {
    renderer('repos');

    expect(el.innerHTML).to.equal('<strong>REPO</strong>');
  });

  describe("when a template does not exist", function () {
    it("renders an empty string", function () {
      renderer('doesnt_exist');

      expect(el.innerHTML).to.equal('');
    });
  });

  describe("when some data is supplied", function () {
    it("is passed to the template", function () {
      var templatesMock = sinon.mock(templates);
      templatesMock.expects('repos').withArgs({ some: 'data' });

      renderer('repos', { some: 'data' });

      templatesMock.verify();
    });
  });

  describe("when no template name is supplied", function () {
    it("renders the root template", function () {
      var templatesMock = sinon.mock(templates);
      templatesMock.expects('/');

      renderer();

      templatesMock.verify();
    });
  });
});
