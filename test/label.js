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
        getImageData: function () {
          return {
            data: {
              buffer: [255, 0, 0, 0]
            }
          };
        }
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
        RGBAFormat: sinon.stub(),
        MeshBasicMaterial: function () {},
        Mesh: function () {
          return {
            position: {
              set: function () {}
            }
          };
        }
      };

  before(function () {
    mockery.registerMock('../config', configMock);
    mockery.registerMock('./util', utilMock);
    mockery.registerMock('three', threeMock);

    label = require('../lib/label');
  });

  describe('initialising the canvas', function () {
    var createElementStub;

    beforeEach(function () {
      createElementStub = sinon.spy(globalStub.document, 'createElement');
      label('text');
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
        .withArgs('TEXT', 0, 25, 300);
      label('text');

      fillMock.verify();
    });
  });

  describe("generating the texture", function () {
    it("extracts the pixel data from the canvas", function () {
      var pixelMock = sinon.mock(contextStub),
          measureStub = sinon.stub(contextStub, 'measureText');
      measureStub
        .withArgs('TEXT')
        .returns({ width: 200 });
      pixelMock
        .expects('getImageData')
        .withArgs(0, 0, 200, 50)
        .returns({
          data: {
            buffer: [255, 0, 0, 0]
          }
        });
      label('text');

      pixelMock.verify();
    });

    it("creates a data texture", function () {
      var pixelStub = sinon.stub(),
          textureMock = sinon.mock(threeMock);
      textureMock
        .expects('DataTexture')
        .withArgs(new Uint8Array([255, 0, 0, 0]), 100, 50, threeMock.RGBAFormat);
      label('test');

      textureMock.verify();
    });
  });

  describe("generating the mesh", function () {
    it("creates a plane", function () {
      var planeMock = sinon.mock(threeMock);
      planeMock
        .expects('PlaneGeometry')
        .withArgs(400, 200, 1, 1);
      label('test');

      planeMock.verify();
    });

    it("generates a material", function () {
      var texture = sinon.stub(),
          textureStub = sinon.stub(threeMock, 'DataTexture').returns(texture),
          materialMock = sinon.mock(threeMock);
      materialMock
        .expects('MeshBasicMaterial')
        .withArgs({
          map: texture,
          transparent: true
        });
      label('test');

      materialMock.verify();
    });

    it("sets the position of the mesh", function () {
      var setMock = sinon.mock();
      sinon.stub(threeMock, 'Mesh').returns({
        position: {
          set: setMock
        }
      });
      setMock
        .withArgs(0, -1000, 0);
      label('test');

      setMock.verify();
    });

    it("returns a mesh", function () {
      var material = sinon.stub(),
          geo = sinon.stub(),
          materialStub = sinon.stub(threeMock, 'MeshBasicMaterial').returns(material),
          geoStub = sinon.stub(threeMock, 'PlaneGeometry').returns(geo),
          meshMock = sinon.mock(threeMock),
          mesh = { position: { set: function () {} } };
      meshMock
        .expects('Mesh')
        .withArgs(geo, material)
        .returns(mesh);
      label('test').should.equal(mesh);

      meshMock.verify();
    });
  });
});
