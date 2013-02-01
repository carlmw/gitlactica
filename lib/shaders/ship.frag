uniform sampler2D ship;
varying vec3 vNormal;
varying vec2 vUv;
void main() {
    vec3 diffuse = texture2D( ship, vUv ).xyz;
    gl_FragColor = vec4( diffuse, 1.0 );
}