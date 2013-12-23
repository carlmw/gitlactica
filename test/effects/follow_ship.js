var followEffect = require('../../lib/effects/follow_ship'),
		renderer = {
			lookTo: function () {},
			shipWorldPosition: function () { return { x: 0, y: 0, z: 0 }; }
		},
		animation = {
			raf: function () {}
		};

// TODO make global.log something local
global.log = function () {};

describe('followShip', function () {
	it('points the camera at the ship', function () {
		sinon.stub(renderer, 'shipWorldPosition')
			.withArgs('carlmw')
			.returns({ x: 100, y: 200, z: 300 });

		var rendererMock = sinon.mock(renderer);
		rendererMock.expects('lookTo').withArgs(100, 200, 300, 0.01);

		followEffect()(animation, renderer, 'carlmw', function () {});

		rendererMock.verify();
	});

	it('creates one raf loop', function () {
		var rendererMock = sinon.mock(renderer),
				effect = followEffect();
		rendererMock.expects('lookTo').once();

		effect(animation, renderer, 'carlmw', function () {});
		effect(animation, renderer, 'bobson', function () {});

		rendererMock.verify();
	});

	it('calls next', function () {
		var nextMock = sinon.mock();
		followEffect()(animation, renderer, 'carlmw', nextMock);

		nextMock.verify();
	});
});
