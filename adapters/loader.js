var THREE = require('three');

module.exports = {
  texture: function (url, success, error) {
    return THREE.ImageUtils.loadTexture(url, undefined, success, error);
  },
  cube: function (urls, success, error) {
    return THREE.ImageUtils.loadTextureCube(urls, undefined, success, error);
  }
};
