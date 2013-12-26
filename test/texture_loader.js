var textureLoader = require('../lib/texture_loader'),
    loader = {
      texture: function () {},
      cube: function () {}
    };

describe('textureLoader', function () {
  it('loads each texture', function () {
    var loaderMock = sinon.mock(loader);
    loaderMock.expects('texture').withArgs('star.png');

    textureLoader(loader, { star: { src: 'star.png', type: 'texture' } });

    loaderMock.verify();
  });

  it('loads different types of texture', function () {
    var loaderMock = sinon.mock(loader);
    loaderMock.expects('cube').withArgs('star.png');

    textureLoader(loader, { star: { src: 'star.png', type: 'cube' } });

    loaderMock.verify();
  });

  it('returns the image', function () {
    sinon.stub(loader, 'texture').withArgs('planet.png').returns('planet image');

    var textures = textureLoader(loader, { planet: { src: 'planet.png', type: 'texture' } });

    expect(textures).to.deep.equal({ planet: 'planet image' });
  });

  describe('when all textures are loaded successfully', function () {
    it('triggers the success callback once', function () {
      var successMock = sinon.mock();
      sinon.stub(loader, 'texture');
      loader.texture.withArgs('planet.png').callsArg(1);
      loader.texture.withArgs('star.png').callsArg(1);

      textureLoader(loader, { star: { src: 'star.png', type: 'texture' }, planet: { src: 'planet.png', type: 'texture' } }, successMock);

      successMock.verify();
    });
  });

  describe('when a texture fails to load', function () {
    it('triggers the fail callback once', function () {
      var failMock = sinon.mock();
      sinon.stub(loader, 'texture');
      loader.texture.withArgs('planet.png').callsArg(2);
      loader.texture.withArgs('star.png').callsArg(2);

      textureLoader(loader, { star: { src: 'star.png', type: 'texture' }, planet: { src: 'planet.png', type: 'texture' } }, function () {}, failMock);
    
      failMock.verify();
    });

    it('does not trigger the success callback', function () {
      var successMock = sinon.mock().never();
      sinon.stub(loader, 'texture');
      loader.texture.withArgs('planet.png').callsArg(1);
      loader.texture.withArgs('star.png').callsArg(2);

      textureLoader(loader, { star: { src: 'star.png', type: 'texture' }, planet: { src: 'planet.png', type: 'texture' } }, successMock, function () {});
    
      successMock.verify();
    });
  });
});
