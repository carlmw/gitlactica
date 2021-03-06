precision highp float;
precision highp int;


#define MAX_DIR_LIGHTS 1
#define MAX_POINT_LIGHTS 1
#define MAX_SPOT_LIGHTS 0
#define MAX_HEMI_LIGHTS 0
#define MAX_SHADOWS 0

#define GAMMA_INPUT
#define GAMMA_OUTPUT
#define PHYSICALLY_BASED_SHADING













#define FLIP_SIDED




uniform mat4 viewMatrix;
uniform vec3 cameraPosition;
uniform vec4 uColor;
varying vec3 vNormal;
varying float intensity;
uniform bool usingDirectionalLighting;
#if MAX_DIR_LIGHTS > 0
uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];
uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];
#endif
void main() {
  vec3 dirDiffuse = vec3( 0.0 );
  vec3 dirSpecular = vec3( 0.0 );
  if (usingDirectionalLighting) {
for( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {
vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );
vec3 dirVector = normalize( lDirection.xyz );
float directionalLightWeightingFull = max( dot( vNormal, dirVector ), 0.0);
float directionalLightWeightingHalf = max(0.5 * dot( vNormal, dirVector ) + 0.5, 0.0);
vec3 dirDiffuseWeight = mix( vec3( directionalLightWeightingFull ), vec3( directionalLightWeightingHalf ) , vec3(0.4) );
dirDiffuse += dirDiffuseWeight;
}
  } else {
  dirDiffuse = vec3( 1.0 );
  }
    gl_FragColor = uColor * intensity * intensity *  vec4(dirDiffuse, 1.0);
}