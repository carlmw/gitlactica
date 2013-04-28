describe('SkyBox', function () {
  var skyBox,
      sceneStub = {
        add: sinon.stub()
      },
      textureStub = {
        repeat: {}
      },
      threeMock = {
        ImageUtils: {
          loadTexture: sinon.stub().returns(textureStub)
        },
        CubeGeometry: sinon.stub(),
        Mesh: sinon.stub(),
        MeshLambertMaterial: sinon.stub(),
        MeshFaceMaterial: sinon.stub(),
        BackSide: 'backside'
      };

  before(function () {
    mockery.registerMock('three', threeMock);
    skyBox = require('../lib/sky_box');
  });

  afterEach(function () {
    sceneStub.add.reset();
  });

  it("creates a texture", function () {
    skyBox(sceneStub, 'texture.jpg');

    threeMock.ImageUtils.loadTexture.should.have.been.calledWith('texture.jpg');
  });

  it("creates a material", function () {
    var textureStub = sinon.stub({ repeat: {} });
    threeMock.ImageUtils.loadTexture
      .withArgs('texture2.jpg')
      .returns(textureStub);
    skyBox(sceneStub, 'texture2.jpg');

    threeMock.MeshLambertMaterial.should.have.been.calledWith({
      map: textureStub,
      depthWrite: false,
      side: threeMock.BackSide
    });
  });


  it("creates a geometry of the correct dimensions", function () {
    skyBox(sceneStub, 'texture.jpg');

    threeMock.CubeGeometry.should.have.been.calledWith(
      4194304, 4194304, 4194304, 1, 1, 1, null, true
    );
  });

  it("creates a mesh with the correct geometry and material", function () {
    threeMock.Mesh.reset();
    var geometryStub = sinon.stub(),
        materialStub = sinon.stub(),
        faceStub = sinon.stub();
    threeMock.CubeGeometry
      .returns(geometryStub);
    threeMock.MeshLambertMaterial
      .returns(materialStub);
    threeMock.MeshFaceMaterial
      .withArgs([
        materialStub, materialStub, materialStub,
        materialStub, materialStub, materialStub
      ])
      .returns(faceStub);
    skyBox(sceneStub, 'texture3.jpg');

    threeMock.Mesh.should.have.been.calledWith(geometryStub, faceStub);
  });

  it("adds the mesh to the scene", function () {
    var meshStub = sinon.stub();
    threeMock.Mesh.returns(meshStub);
    skyBox(sceneStub, 'texture.jpg');

    sceneStub.add.should.have.been.calledWith(meshStub);
  });
});
