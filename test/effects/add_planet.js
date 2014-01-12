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
    expect(move.args[1]).to.deep.equal(['jquery/jquery', 0, 10000, 2500]);
    expect(move.args[2]).to.deep.equal(['joyent/node', 10000, 10000, 2500]);
    expect(move.args[3]).to.deep.equal(['mrdoob/three.js', 10000, 0, 2500]);
    expect(move.args[4]).to.deep.equal(['jashkenas/backbone', 10000, -10000, 2500]);
    expect(move.args[5]).to.deep.equal(['herp/derp', 0, -10000, 2500]);
    expect(move.args[6]).to.deep.equal(['flip/flop', -10000, -10000, 2500]);
    expect(move.args[7]).to.deep.equal(['clip/clop', -10000, 0, 2500]);
    expect(move.args[8]).to.deep.equal(['bing/bang', -10000, 10000, 2500]);
    expect(move.args[9]).to.deep.equal(['this/that', -10000, 20000, 2500]);
    expect(move.args[10]).to.deep.equal(['up/down', 0, 20000, 2500]);
    expect(move.args[11]).to.deep.equal(['strange/charm', 10000, 20000, 2500]);
    expect(move.args[12]).to.deep.equal(['bottom/top', 20000, 20000, 2500]);
  });
});
