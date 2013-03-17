describe("HUD", function () {
  var global = {
        document: {
          createElement: function () { return {}; },
          body: { appendChild: function () {} }
        }
      },
      subspace = { on: function () {} },
      handlebars = {
        compile: function () { return function () {}; }
      },
      HUD;

  mockery.registerMock('handlebars', handlebars);
  mockery.registerMock('./utils', { global: function() { return global; } });
  mockery.registerAllowable('../lib/hud.js');
  mockery.enable();

  HUD = require('../lib/hud.js');

  after(function () {
    mockery.deregisterAll();
  });

  describe("it's DOM element", function () {
    it("is a div", function () {
      var documentMock = sinon.mock(global.document);
      documentMock.expects('createElement')
        .withArgs('div')
        .returns({});

      new HUD();

      documentMock.verify();
    });

    it("has a class of 'hud'", function () {
      var el = { className: '' };
      sinon.stub(global.document, 'createElement').returns(el);

      new HUD();
      el.className.should.equal('hud');
      global.document.createElement.restore();
    });

    it("is accessible", function () {
      var el = sinon.stub();
      sinon.stub(global.document, 'createElement').returns(el);

      new HUD().el.should.equal(el);
      global.document.createElement.restore();
    });

    it("appends the element to the body", function () {
      var bodyMock = sinon.mock(global.document.body),
          el = sinon.stub();
      sinon.stub(global.document, 'createElement').returns(el);
      bodyMock.expects('appendChild')
        .withArgs(el);

      new HUD();

      bodyMock.verify();
      global.document.createElement.restore();
    });
  });

  describe("rendering", function () {
    var element = {};

    before(function () {
      sinon.stub(global.document, 'createElement').returns(element);
    });

    after(function () {
      global.document.createElement.restore();
    });

    beforeEach(function () {
      element.innerHTML = '';
    });

    it("compiles the template", function () {
      var handlebarsMock = sinon.mock(handlebars);

      handlebarsMock.expects('compile')
        .withArgs(HUD.template)
        .returns(function () {});

      new HUD().render();

      handlebarsMock.verify();
      handlebarsMock.restore();
    });

    it("renders the template", function () {
      var templateMock = sinon.mock();
      sinon.stub(handlebars, 'compile').returns(templateMock);
      templateMock.withArgs({ derp: 'herp'});

      new HUD().render({ derp: 'herp' });

      templateMock.verify();
      handlebars.compile.restore();
    });

    it("sets the rendered output as the content of it's DOMElement", function () {
      sinon.stub(handlebars, 'compile').returns(function () {
        return 'rendered';
      });
      new HUD().render();
      element.innerHTML.should.equal('rendered');
      handlebars.compile.restore();
    });
  });
});
