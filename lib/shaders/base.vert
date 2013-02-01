varying vec3 vNormal;
varying vec2 vUv;
void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    vNormal = normalize( normalMatrix * normal );
    vUv = uv;
}