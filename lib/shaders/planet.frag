uniform sampler2D planet;
varying vec3 vNormal;
varying vec2 vUv;
void main() {
    vec3 diffuse = texture2D( planet, vUv ).xyz;
    float intensity = 0.2 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) );
    vec3 atmosphere = vec3( 0.5, 0.5, 0.5 ) * pow( intensity, 3.0 );
    gl_FragColor = vec4( diffuse + atmosphere, 2.0 );
}