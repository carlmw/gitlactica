describe('Planet', function () {
  var Planet,
      sceneStub = {
        add: sinon.stub()
      },
      tweenInstanceStub = {
        to: function () { return tweenInstanceStub; },
        onComplete: function () { return tweenInstanceStub; },
        start: function () { return tweenInstanceStub; }
      },
      tweenMock = {
        Tween: function () {
          return tweenInstanceStub;
        }
      },
      threeMock = {
        SphereGeometry: function () {},
        Object3D: function () {
          return {
            add: function () {}
          };
        },
        Mesh: function () {},
        ImageUtils: {
          loadTexture: function () {}
        },
        ShaderMaterial: function () {},
        PlaneGeometry: function () {}
      },
      labelMock = sinon.stub(),
      configMock = {
        languages: {
          Unknown: {
            texture: 'unknown.jpg'
          },
          JavaScript: {
            texture: 'javascript.jpg'
          }
        }
      };

  before(function () {
    mockery.registerAllowable('../lib/planet');
    mockery.registerAllowable('./shaders');
    mockery.registerMock('three', threeMock);
    mockery.registerMock('tween', tweenMock);
    mockery.registerMock('./label', labelMock);
    mockery.registerMock('../config', configMock);

    mockery.enable();

    Planet = require('../lib/planet');
  });

  after(function () {
    mockery.deregisterAll();
  });

  describe("initialisation", function () {
    it("creates a text label", function () {
      labelMock.reset();
      
      new Planet(sceneStub, 'bob/repo', 'JavaScript');

      labelMock.should.have.been.calledWith('repo');
    });

    it("add's the test label to the planet", function () {
      var label = sinon.stub(),
          addStub = sinon.stub(),
          object3DStub = sinon.stub(threeMock, 'Object3D').returns({ add: addStub });
      
      labelMock.returns(label);

      new Planet(sceneStub, 'bob/repo', 'JavaScript');

      object3DStub.restore();
      addStub.should.have.been.calledWith(label);
    });
  });

  describe('#scale', function () {
    it("transforms the mesh", function () {
      var meshStub = sinon.stub(threeMock, 'Mesh'),
          scaleMock = sinon.mock();

      scaleMock.withArgs(3, 3, 3);

      meshStub.returns({
        scale: {
          set: scaleMock
        }
      });

      var planet = new Planet(sceneStub, 'bob/repo', 'JavaScript');

      planet.scale(3);

      scaleMock.verify();
      meshStub.restore();
    });
  });
});
