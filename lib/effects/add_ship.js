module.exports = function (animation, renderer, name, next) {
  renderer.addShip(name);
  next();
};
