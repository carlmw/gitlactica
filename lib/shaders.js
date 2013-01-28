define(['vendor/three'], function (THREE) {
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
      both: [
        'varying vec3 vNormal;',
        'varying vec2 vUv;',
        'void main() {',
          'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
          'vNormal = normalize( normalMatrix * normal );',
          'vUv = uv;',
        '}'
      ].join('\n')
    },
    fragment: {
      planet: [
        'uniform sampler2D planet;',
        'varying vec3 vNormal;',
        'varying vec2 vUv;',
        'void main() {',
          'vec3 diffuse = texture2D( planet, vUv ).xyz;',
          'float intensity = 0.2 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) );',
          'vec3 atmosphere = vec3( 0.5, 0.5, 0.5 ) * pow( intensity, 3.0 );',
          'gl_FragColor = vec4( diffuse + atmosphere, 2.0 );',
        '}'
      ].join('\n'),
      ship: [
        'uniform sampler2D ship;',
        'varying vec3 vNormal;',
        'varying vec2 vUv;',
        'void main() {',
          'vec3 diffuse = texture2D( ship, vUv ).xyz;',
          'gl_FragColor = vec4( diffuse, 1.0 );',
        '}'
      ].join('\n')
    }
  };
});
