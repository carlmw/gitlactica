describe('Planet', function () {
  var Planet,
      sceneStub = {
        add: sinon.stub()
      },
      three = require('three'),
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
    mockery.registerMock('../config', configMock);
    Planet = require('../lib/planet');
  });

  after(function () {
    mockery.deregisterMock('../config');
  });

  describe('#scale', function () {
    it("transforms the mesh", function () {
      var meshStub = sinon.stub(three, 'Mesh'),
          scaleMock = sinon.mock();
      scaleMock.withArgs(3, 3, 3);
      meshStub.returns({
        scale: {
          set: scaleMock
        }
      });
      new Planet(sceneStub, 'bob/repo', 'JavaScript').scale(3);

      scaleMock.verify();
    });
  });
});
