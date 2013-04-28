describe('SkyBox', function () {
  var scene = { add: function () {} },
      three = require('three'),
      skyBox = require('../lib/sky_box');

  it("creates a texture", function () {
    sinon.stub(three.ImageUtils, 'loadTexture').returns({ repeat: {} });
    skyBox(scene, 'texture.jpg');

    three.ImageUtils.loadTexture.should.have.been.calledWith('texture.jpg');
  });

  it("creates a material", function () {
    var texture = { repeat: {} },
        threeMock = sinon.mock(three);

    threeMock.expects('MeshLambertMaterial')
      .withArgs({
        map: texture,
        depthWrite: false,
        side: three.BackSide
      });
    sinon.stub(three.ImageUtils, 'loadTexture')
      .withArgs('texture2.jpg')
      .returns(texture);
    skyBox(scene, 'texture2.jpg');

    threeMock.verify();
  });


  it("creates a geometry of the correct dimensions", function () {
    var threeMock = sinon.mock(three)
      .expects('CubeGeometry')
      .withArgs(4194304, 4194304, 4194304, 1, 1, 1, null, true);
    skyBox(scene, 'texture.jpg');

    threeMock.verify();
  });

  it("creates a mesh with the correct geometry and material", function () {
    var geometry = {},
        material = {},
        face = {},
        threeMock = sinon.mock(three);
    threeMock.expects('Mesh')
      .withArgs(geometry, face);
    sinon.stub(three, 'CubeGeometry').returns(geometry);
    sinon.stub(three, 'MeshLambertMaterial').returns(material);
    sinon.stub(three, 'MeshFaceMaterial')
      .withArgs([
        material, material, material,
        material, material, material
      ])
      .returns(face);
    skyBox(scene, 'texture3.jpg');

    threeMock.verify();
  });

  it("adds the mesh to the scene", function () {
    var scene = { add: sinon.mock() },
        mesh = {};
    scene.add.withArgs(mesh);
    sinon.stub(three, 'Mesh').returns(mesh);
    skyBox(scene, 'texture.jpg');

    scene.add.verify();
  });
});
