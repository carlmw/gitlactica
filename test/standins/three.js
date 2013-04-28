module.exports = {
  Vector3: function () {
    return { x: 0, y: 0, z: 0 };
  },
  DataTexture: function () {},
  PlaneGeometry: function () {},
  SphereGeometry: function () {},
  CubeGeometry: function () {},
  RGBAFormat: 'rgba',
  MeshBasicMaterial: function () {},
  ShaderMaterial: function () {},
  MeshLambertMaterial: function () {},
  MeshFaceMaterial: function () {},
  Mesh: function () {
    return {
      position: {
        set: function () {}
      }
    };
  },
  Object3D: function () {
    return {
      add: function () {}
    };
  },
  ImageUtils: {
    loadTexture: function () {
      return { repeat: {} };
    }
  },
  BackSide: 'backside'
};
