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
  mockery.registerMock('./util', { global: function() { return global; } });
  HUD = require('../lib/hud.js');

  describe("it's DOM element", function () {
    it("is a div", function () {
      var documentMock = sinon.mock(global.document);
      documentMock.expects('createElement')
        .withArgs('div')
        .returns({});
      new HUD(subspace);

      documentMock.verify();
    });

    it("has a class of 'hud'", function () {
      var el = { className: '' };
      sinon.stub(global.document, 'createElement').returns(el);
      new HUD(subspace);

      el.className.should.equal('hud');
    });

    it("is accessible", function () {
      var el = sinon.stub();
      sinon.stub(global.document, 'createElement').returns(el);

      new HUD(subspace).el.should.equal(el);
    });

    it("appends the element to the body", function () {
      var bodyMock = sinon.mock(global.document.body),
          el = sinon.stub();
      sinon.stub(global.document, 'createElement').returns(el);
      bodyMock.expects('appendChild')
        .withArgs(el);
      new HUD(subspace);

      bodyMock.verify();
    });
  });

  describe("rendering", function () {
    var element = {};

    beforeEach(function () {
      sinon.stub(global.document, 'createElement').returns(element);
    });

    beforeEach(function () {
      element.innerHTML = '';
    });

    it("compiles the template", function () {
      var handlebarsMock = sinon.mock(handlebars);
      handlebarsMock.expects('compile')
        .withArgs(HUD.template)
        .returns(function () {});
      new HUD(subspace).render();

      handlebarsMock.verify();
    });

    it("renders the template", function () {
      var templateMock = sinon.mock();
      sinon.stub(handlebars, 'compile').returns(templateMock);
      templateMock.withArgs({ derp: 'herp'});
      new HUD(subspace).render({ derp: 'herp' });

      templateMock.verify();
    });

    it("sets the rendered output as the content of it's DOMElement", function () {
      sinon.stub(handlebars, 'compile').returns(function () {
        return 'rendered';
      });
      new HUD(subspace).render();
      element.innerHTML.should.equal('rendered');
    });
  });

  describe("when a planet is shown", function () {
    it("updates the hud", function () {
      var el = { innerHTML: '', className: '' },
          templateStub = sinon.stub();
      sinon.stub(global.document, 'createElement').returns(el);
      sinon.stub(handlebars, 'compile').returns(templateStub);
      sinon.stub(subspace, 'on').callsArgWith(1, { name: 'gitlactica' });
      templateStub.withArgs({ name: 'gitlactica' }).returns('gitlactica');
      new HUD(subspace);

      el.innerHTML.should.equal('gitlactica');
    });
  });
});
