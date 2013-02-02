define(['vendor/three', 'vendor/text!shaders/base.vert', 'vendor/text!shaders/planet.frag', 'vendor/text!shaders/ship.frag'], function (THREE, baseVert, planetFrag, shipFrag) {
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
