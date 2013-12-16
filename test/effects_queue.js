var effectsQueue = require('../lib/effects_queue'),
    effects = { someEffect: function () {} };

describe('effectsQueue', function () {
  var queue;

  beforeEach(function () {
    queue = effectsQueue(effects, 'animation', 'renderer');
  });

  it("effects receive animation and renderer", function () {
    var effectsMock = sinon.mock(effects);
    effectsMock.expects('someEffect').withArgs('animation', 'renderer');

    queue.push('someEffect');

    effectsMock.verify();
  });

  it("receives any arbitrary arguments", function () {
    var effectsMock = sinon.mock(effects);
    effectsMock.expects('someEffect').withArgs('animation', 'renderer', 'foo', 'bar');

    queue.push('someEffect', 'foo', 'bar');

    effectsMock.verify();
  });

});
