var followEffect = require('../../lib/effects/follow'),
		renderer = {
			lookTo: function () {},
			shipWorldPosition: function () { return { x: 0, y: 0, z: 0 }; },
			planetPosition: function () { return { x: 0, y: 0, z: 0 }; }
		},
		animation = {
			registerUpdater: function (name, fn) { fn(10); }
		};

// TODO make global.log something local
global.log = function () {};

describe('follow', function () {
	describe('when following a ship', function () {
		it('points the camera at the ship', function () {
			sinon.stub(renderer, 'shipWorldPosition')
				.withArgs('carlmw')
				.returns({ x: 100, y: 200, z: 300 });

			var rendererMock = sinon.mock(renderer);
			rendererMock.expects('lookTo').withArgs(100, 200, 300, 0.14);

			followEffect(animation, renderer, 'ship', 'carlmw', function () {});

			rendererMock.verify();
		});
	});

	describe('when following a planet', function () {
		it('points the camera at the planet', function () {
			sinon.stub(renderer, 'planetPosition')
				.withArgs('klendathu')
				.returns({ x: 200, y: 300, z: 400 });

			var rendererMock = sinon.mock(renderer);
			rendererMock.expects('lookTo').withArgs(200, 300, 400, 0.14);

			followEffect(animation, renderer, 'planet', 'klendathu', function () {});

			rendererMock.verify();
		});
	});

	describe('when the type is not recognised', function () {
		it('throws', function () {
			expect(function () {
				followEffect(animation, renderer, 'derp', 'herp', function () {});
			}).to.throw('Unexpected object type "derp"');
		});
	});

	it('calls next', function () {
		var nextMock = sinon.mock();
		followEffect(animation, renderer, 'ship', 'carlmw', nextMock);

		nextMock.verify();
	});
});
