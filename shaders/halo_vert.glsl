precision highp float;
precision highp int;

#define VERTEX_TEXTURES
#define GAMMA_INPUT
#define GAMMA_OUTPUT
#define PHYSICALLY_BASED_SHADING
#define MAX_DIR_LIGHTS 1
#define MAX_POINT_LIGHTS 1
#define MAX_SPOT_LIGHTS 0
#define MAX_HEMI_LIGHTS 0
#define MAX_SHADOWS 0
#define MAX_BONES 251














#define FLIP_SIDED





uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat3 normalMatrix;
uniform vec3 cameraPosition;
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
attribute vec2 uv2;
#ifdef USE_COLOR
attribute vec3 color;
#endif
#ifdef USE_MORPHTARGETS
attribute vec3 morphTarget0;
attribute vec3 morphTarget1;
attribute vec3 morphTarget2;
attribute vec3 morphTarget3;
#ifdef USE_MORPHNORMALS
attribute vec3 morphNormal0;
attribute vec3 morphNormal1;
attribute vec3 morphNormal2;
attribute vec3 morphNormal3;
#else
attribute vec3 morphTarget4;
attribute vec3 morphTarget5;
attribute vec3 morphTarget6;
attribute vec3 morphTarget7;
#endif
#endif
#ifdef USE_SKINNING
attribute vec4 skinIndex;
attribute vec4 skinWeight;
#endif
uniform vec3 viewVector;
attribute vec4 tangent;
varying vec3 vNormal;
varying float intensity;
uniform float uTop;
uniform float uPower;
void main() {
  vNormal = normalize( normalMatrix * normal );
  vec3 vNormel = normalize( normalMatrix * viewVector );
  intensity = pow( uTop - dot(vNormal, vNormel), uPower );
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}