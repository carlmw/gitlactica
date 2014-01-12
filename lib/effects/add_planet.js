module.exports = function () {
  var i = 0,
      distance = 10000,
      pos = { x: 0, y: 0, z: 0 };

  return function addPlanet (animation, renderer, repo, colour, next) {
    renderer.addPlanet(repo, colour);
    renderer.movePlanet(repo, pos.x * distance, pos.y * distance, pos.z * distance);
    pos = getNextPosition(pos);
    next();
  };

  function getNextPosition (pos) {
    var x = pos.x,
        y = pos.y,
        level = Math.max(Math.abs(x), Math.abs(y)),
        delta = { x: 0, y: 0 };

    if (-x === level) delta.y = 1;
    else if (y === level) delta.x = 1;
    else if (x === level) delta.y = -1;
    else if (-y === level) delta.x = -1;

    if (x > 0 && (x === y || x === -y)) delta = { x: delta.y, y: -delta.x};

    x += delta.x;
    y += delta.y;

    return { x: x, y: y, z: Math.random() };
  }
};
