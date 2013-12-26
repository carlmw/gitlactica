var _ = require('lodash');

module.exports = function textureLoader(loader, textures, success, error) {
  var total = Object.keys(textures).length,
      count = 0,
      successCount = 0;

  return _.reduce(textures, function (memo, tex, name) {
    memo[name] = loader[tex.type](tex.src, handleSuccess, done);
    return memo;
  }, {});

  function handleSuccess () {
    successCount++;
    done();
  }

  function done () {
    count++;
    if (count < total) return;
    if (successCount === total) return success();
    error();
  }
};
