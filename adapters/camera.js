module.exports = function camera (cam) {
  return {
    lookAt: function (x, y, z) {
      cam.lookAt({ x: x, y: y, z: z });
      log('Looked at ' + x + ', ' + y + ', ' + z);
    }
  };
};
