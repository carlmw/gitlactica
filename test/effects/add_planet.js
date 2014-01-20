var addPlanet = require('../../lib/effects/add_planet'),
    animation = {},
    renderer = {
      addPlanet: function () {},
      movePlanet: function () {}
    };

describe('addPlanet', function () {
  it('adds the planet to the scene', function () {
    var rendererMock = sinon.mock(renderer)
          .expects('addPlanet')
          .withArgs('carlmw/gitlactica', 0xfff);

    addPlanet()(animation, renderer, 'carlmw/gitlactica', 0xfff, function () {});

    rendererMock.verify();
  });

  it('calls next', function () {
    var nextMock = sinon.mock();

    addPlanet()(animation, renderer, 'carlmw/gitlactica', 0xfff, nextMock);

    nextMock.verify();
  });

  it('scatters planets', function () {
    sinon.stub(Math, 'random').returns(0.25);

    var move = sinon.stub(renderer, 'movePlanet'),
        subject = addPlanet(), noop = function () {};

    subject(animation, renderer, 'carlmw/gitlactica', 0xfff, noop);
    subject(animation, renderer, 'jquery/jquery', 0xfff, noop);
    subject(animation, renderer, 'joyent/node', 0xfff, noop);
    subject(animation, renderer, 'mrdoob/three.js', 0xfff, noop);
    subject(animation, renderer, 'jashkenas/backbone', 0xfff, noop);
    subject(animation, renderer, 'herp/derp', 0xfff, noop);
    subject(animation, renderer, 'flip/flop', 0xfff, noop);
    subject(animation, renderer, 'clip/clop', 0xfff, noop);
    subject(animation, renderer, 'bing/bang', 0xfff, noop);
    subject(animation, renderer, 'this/that', 0xfff, noop);
    subject(animation, renderer, 'up/down', 0xfff, noop);
    subject(animation, renderer, 'strange/charm', 0xfff, noop);
    subject(animation, renderer, 'bottom/top', 0xfff, noop);

    expect(move.args[0]).to.deep.equal(['carlmw/gitlactica', 0, 0, 0]);
    expect(move.args[1]).to.deep.equal(['jquery/jquery', 0, 20000, 5000]);
    expect(move.args[2]).to.deep.equal(['joyent/node', 20000, 20000, 5000]);
    expect(move.args[3]).to.deep.equal(['mrdoob/three.js', 20000, 0, 5000]);
    expect(move.args[4]).to.deep.equal(['jashkenas/backbone', 20000, -20000, 5000]);
    expect(move.args[5]).to.deep.equal(['herp/derp', 0, -20000, 5000]);
    expect(move.args[6]).to.deep.equal(['flip/flop', -20000, -20000, 5000]);
    expect(move.args[7]).to.deep.equal(['clip/clop', -20000, 0, 5000]);
    expect(move.args[8]).to.deep.equal(['bing/bang', -20000, 20000, 5000]);
    expect(move.args[9]).to.deep.equal(['this/that', -20000, 40000, 5000]);
    expect(move.args[10]).to.deep.equal(['up/down', 0, 40000, 5000]);
    expect(move.args[11]).to.deep.equal(['strange/charm', 20000, 40000, 5000]);
    expect(move.args[12]).to.deep.equal(['bottom/top', 40000, 40000, 5000]);
  });

  describe('when the planet already exists', function () {
    beforeEach(function () {
      sinon.stub(renderer, 'addPlanet');
    });

    it('does nothing', function () {
      var add = addPlanet();
      add(animation, renderer, 'carlmw/gitlactica', 0xfff, function () {});
      add(animation, renderer, 'carlmw/gitlactica', 0xfff, function () {});

      expect(renderer.addPlanet).to.have.been.calledOnce;
    });

    it('calls next', function () {
      var add = addPlanet(),
          next = sinon.spy();
      add(animation, renderer, 'carlmw/gitlactica', 0xfff, next);
      add(animation, renderer, 'carlmw/gitlactica', 0xfff, next);

      expect(next).to.have.been.calledTwice;
    });
  });
});
