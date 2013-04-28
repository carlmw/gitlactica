describe('Weapon', function () {
  var Weapon,
      ship = sinon.stub(),
      scene = sinon.stub(),
      planet = sinon.stub(),
      torpedo = sinon.stub(),
      torpedoConstructor = sinon.stub().returns(torpedo),
      bombard = sinon.stub(),
      queueMock = sinon.stub().returns({
        defer: function () {
          var args = Array.prototype.slice.call(arguments, 0);

          args[0].apply(null, args.slice(1));

          return queueMock.returnValue;
        },
        await: sinon.stub().callsArg(0)
      }),
      tractor = sinon.stub();

  before(function () {
    mockery.registerMock('./torpedo', torpedoConstructor);
    mockery.registerMock('./animation/bombard', bombard);
    mockery.registerMock('./animation/tractor', tractor);
    mockery.registerMock('queue-async', queueMock);
    Weapon = require('../lib/weapon');
  });

  after(function () {
    mockery.deregisterMock('./torpedo');
    mockery.deregisterMock('./animation/bombard');
    mockery.deregisterMock('./animation/tractor');
    mockery.deregisterMock('queue-async');
  });

  describe('#fire', function () {
    var weapon,
        next;

    beforeEach(function () {
      weapon = new Weapon(ship, scene);
      next = sinon.stub();
      queueMock.reset();
    });

    it("creates a queue with 2 workers", function () {
      weapon.fire(1, 1, planet, next);

      queueMock.should.have.been.calledWith(2);
    });

    it("queues animation for input", function () {
      bombard.reset();
      weapon.fire(1, 1, planet, next);

      bombard.should.have.been.calledWith(scene, ship, planet, [torpedo]);
    });

    it("queues animation for output", function () {
      tractor.reset();
      weapon.fire(1, 1, planet, next);

      tractor.should.have.been.calledWith(ship, planet, [torpedo]);
    });

    it("calls next when complete", function () {
      next.reset();
      weapon.fire(1, 1, planet, next);

      next.should.have.been.calledOnce;
    });
  });

});
