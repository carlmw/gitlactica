describe('Weapon', function () {
  var Weapon,
      ship = sinon.stub(),
      scene = sinon.stub(),
      planet = sinon.stub(),
      torpedo = sinon.stub(),
      torpedoMock = sinon.stub().returns(torpedo),
      bombardMock = sinon.stub(),
      queueMock = sinon.stub().returns({
        defer: function () {
          var args = Array.prototype.slice.call(arguments, 0);

          args[0].apply(null, args.slice(1));

          return queueMock.returnValue;
        },
        await: sinon.stub().callsArg(0)
      }),
      tractorMock = sinon.stub();

  before(function () {
    mockery.registerMock('./torpedo', torpedoMock);
    mockery.registerMock('./animation/bombard', bombardMock);
    mockery.registerMock('./animation/tractor', tractorMock);
    mockery.registerMock('queue-async', queueMock);
    Weapon = require('../lib/weapon');
  });

  describe('#fire', function () {
    var weapon,
        nextStub;

    beforeEach(function () {
      weapon = new Weapon(ship, scene);
      nextStub = sinon.stub();
      queueMock.reset();
    });

    it("creates a queue with 2 workers", function () {
      weapon.fire(1, 1, planet, nextStub);

      queueMock.should.have.been.calledWith(2);
    });

    it("queues animation for input", function () {
      bombardMock.reset();
      weapon.fire(1, 1, planet, nextStub);

      bombardMock.should.have.been.calledWith(scene, ship, planet, [torpedo]);
    });

    it("queues animation for output", function () {
      tractorMock.reset();
      weapon.fire(1, 1, planet, nextStub);

      tractorMock.should.have.been.calledWith(ship, planet, [torpedo]);
    });

    it("calls next when complete", function () {
      nextStub.reset();
      weapon.fire(1, 1, planet, nextStub);

      nextStub.should.have.been.calledOnce;
    });
  });

});
