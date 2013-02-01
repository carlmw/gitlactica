define(['vendor/three', 'text!shaders/base.vert', 'text!shaders/planet.frag', 'text!shaders/ship.frag'], function (THREE, baseVert, planetFrag, shipFrag) {
  "use strict";

  return {
    uniforms: {
      'planet': {
        type: 't',
        value: THREE.ImageUtils.loadTexture('texture.jpg')
      },
      'ship': {
        type: 't',
        value: THREE.ImageUtils.loadTexture('texture2.jpg')
      }
    },
    vertex: {
      both: baseVert
    },
    fragment: {
      planet: planetFrag,
      ship: shipFrag
    }
  };
});
