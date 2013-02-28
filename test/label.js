describe('label', function () {
  var label,
      configMock = {
        label: {
          width: 300,
          height: 50,
          font: '20pt arial',
          fillStyle: '#ffffff'
        }
      },
      contextStub = {
        fillText: function () {},
        measureText: function () {
          return {
            width: 100
          };
        },
        clearRect: function () {},
        getImageData: function () {}
      },
      canvasStub = {
        getContext: sinon.stub()
          .withArgs('2d')
          .returns(contextStub)
      },
      globalStub = {
        document: {
          createElement: function () {
            return canvasStub;
          }
        }
      },
      utilMock = {
        global: function () {
          return globalStub;
        }
      },
      threeMock = {
        DataTexture: function () {},
        PlaneGeometry: function () {},
        RGBFormat: sinon.stub(),
        MeshLambertMaterial: function () {},
        Mesh: function () {}
      };

  before(function () {
    mockery.registerAllowable('../lib/label');
    mockery.registerMock('../config', configMock);
    mockery.registerMock('./util', utilMock);
    mockery.registerMock('three', threeMock);

    mockery.enable();

    label = require('../lib/label');
  });

  after(function () {
    mockery.deregisterAll();
  });

  describe('initialising the canvas', function () {
    var createElementStub;

    before(function () {
      createElementStub = sinon.spy(globalStub.document, 'createElement');

      label('text');
    });

    after(function () {
      createElementStub.restore();
    });

    it("creates a canvas", function () {
      createElementStub.should.have.been.calledWith('canvas');
    });

    it("sets the canvas dimensions", function () {
      canvasStub.width.should.equal(300);
      canvasStub.height.should.equal(50);
    });

    it("sets the font and font size", function () {
      contextStub.font.should.equal('20pt arial');
    });

    it("sets the fill style", function () {
      contextStub.fillStyle.should.equal('#ffffff');
    });
  });

  describe("drawing the text", function () {
    it("clears the canvas", function () {
      var clearMock = sinon.mock(contextStub);

      clearMock
        .expects('clearRect')
        .withArgs(0, 0, 300, 50);

      label('text');

      clearMock.verify();
    });

    it("fills the canvas with our label", function () {
      var fillMock = sinon.mock(contextStub);

      fillMock
        .expects('fillText')
        .withArgs('text', 0, 25, 300);

      label('text');

      fillMock.verify();
    });
  });

  describe("generating the texture", function () {
    it("extracts the pixel data from the canavs", function () {
      var pixelMock = sinon.mock(contextStub),
          measureStub = sinon.stub(contextStub, 'measureText');

      measureStub
        .withArgs('text')
        .returns({ width: 200 });

      pixelMock
        .expects('getImageData')
        .withArgs(0, 0, 200, 50);

      label('text');

      pixelMock.verify();
      measureStub.restore();
    });

    it("creates a data texture", function () {
      var pixelStub = sinon.stub(),
          textureMock = sinon.mock(threeMock);

      sinon.stub(contextStub, 'getImageData')
        .returns(pixelStub);

      textureMock
        .expects('DataTexture')
        .withArgs(pixelStub, 300, 50, threeMock.RGBFormat);

      label('test');

      textureMock.verify();
      contextStub.getImageData.restore();
    });
  });

  describe("generating the mesh", function () {
    it("creates a plane", function () {
      var planeMock = sinon.mock(threeMock);

      planeMock
        .expects('PlaneGeometry')
        .withArgs(100, 50, 1, 1);

      label('test');

      planeMock.verify();
    });

    it("generates a material", function () {
      var texture = sinon.stub(),
          textureStub = sinon.stub(threeMock, 'DataTexture').returns(texture),
          materialMock = sinon.mock(threeMock);

      materialMock
        .expects('MeshLambertMaterial')
        .withArgs({
          map: texture
        });

      label('test');

      materialMock.verify();
      textureStub.restore();
    });

    it("returns a mesh", function () {
      var material = sinon.stub(),
          geo = sinon.stub(),
          materialStub = sinon.stub(threeMock, 'MeshLambertMaterial').returns(material),
          geoStub = sinon.stub(threeMock, 'PlaneGeometry').returns(geo),
          meshMock = sinon.mock(threeMock),
          mesh = sinon.stub();

      meshMock
        .expects('Mesh')
        .withArgs(geo, material)
        .returns(mesh);

      label('test').should.equal(mesh);

      meshMock.verify();

      materialStub.restore();
      geoStub.restore();
    });
  });
});
