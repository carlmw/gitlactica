module.exports = function (animation, renderer, name, next) {
	log('Revealed planet');
	animation.tween({ y: 20000 })
	.to({ y: 2500 }, 4e3)
	.easing(animation.EASING.Quartic.Out)
	.onUpdate(function () {
		renderer.lookAt(0, this.y, 0);
	})
	.onComplete(next)
	.start();
};
