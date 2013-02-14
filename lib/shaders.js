var THREE = require('three'),
    baseVert,
    planetFrag,
    shipFrag;

baseVert = ['',
'varying vec3 vNormal;',
'varying vec2 vUv;',
'void main() {',
  'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
  'vNormal = normalize( normalMatrix * normal );',
  'vUv = uv;',
'}'
].join('');

planetFrag = ['',
'uniform sampler2D planet;',
'varying vec3 vNormal;',
'varying vec2 vUv;',
'void main() {',
  'vec3 diffuse = texture2D( planet, vUv ).xyz;',
  'float intensity = 0.2 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) );',
  'vec3 atmosphere = vec3( 0.5, 0.5, 0.5 ) * pow( intensity, 3.0 );',
  'gl_FragColor = vec4( diffuse + atmosphere, 2.0 );',
'}'
].join('');

shipFrag = ['',
'uniform sampler2D ship;',
'varying vec3 vNormal;',
'varying vec2 vUv;',
'void main() {',
  'vec3 diffuse = texture2D( ship, vUv ).xyz;',
  'gl_FragColor = vec4( diffuse, 1.0 );',
'}'
].join('');

module.exports = {
  uniforms: {
    'planet': {
      type: 't',
      value: THREE.ImageUtils.loadTexture('textures/texture.jpg')
    },
    'ship': {
      type: 't',
      value: THREE.ImageUtils.loadTexture('textures/texture2.jpg')
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
