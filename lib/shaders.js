var THREE = require('three'),
    fs = require('fs'),
    baseVert = fs.readFileSync(__dirname + '/shaders/base.vert'),
    planetFrag = fs.readFileSync(__dirname + '/shaders/planet.frag'),
    shipFrag = fs.readFileSync(__dirname + '/shaders/ship.frag');

module.exports = {
  ship: {
    uniforms: {
      ship: {
        type: 't',
        value: THREE.ImageUtils.loadTexture('textures/texture2.jpg')
      }
    },
    vertex: baseVert,
    fragment: shipFrag
  },
  planet: {
    vertex: baseVert,
    fragment: planetFrag
  }
};
