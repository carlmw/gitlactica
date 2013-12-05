var THREE = require('three'),
    tex0 = THREE.ImageUtils.loadTexture('/textures/flare0.png'),
    tex2 = THREE.ImageUtils.loadTexture('/textures/flare2.png'),
    tex3 = THREE.ImageUtils.loadTexture('/textures/flare3.png');

module.exports = function Star (scene, x, y, z) {
  var pos = new THREE.Vector3(x, y, z);

  addLight(pos);
  addFlare(0.55, 0.9, 0.5, pos);

  function addLight (pos) {
    scene.add(new THREE.AmbientLight(0x111111));
    var point = new THREE.PointLight(0xffffff, 1, 0);
    point.position = pos;
    scene.add(point);
  }

  function addFlare (h, s, l, pos) {
    var flareColor = new THREE.Color(0xffffff);
    flareColor.setHSL(h, s, l + 0.5);

    var lensFlare = new THREE.LensFlare(tex0, 700, 0.0, THREE.AdditiveBlending, flareColor);

    lensFlare.add(tex2, 512, 0.0, THREE.AdditiveBlending );
    lensFlare.add(tex2, 512, 0.0, THREE.AdditiveBlending );
    lensFlare.add(tex2, 512, 0.0, THREE.AdditiveBlending );

    lensFlare.add(tex3, 60, 0.6, THREE.AdditiveBlending );
    lensFlare.add(tex3, 70, 0.7, THREE.AdditiveBlending );
    lensFlare.add(tex3, 120, 0.9, THREE.AdditiveBlending );
    lensFlare.add(tex3, 70, 1.0, THREE.AdditiveBlending );

    lensFlare.customUpdateCallback = update;
    lensFlare.position = pos;
    scene.add( lensFlare );
  }

  function update (object) {
    var f, fl = object.lensFlares.length;
    var flare;
    var vecX = -object.positionScreen.x * 2;
    var vecY = -object.positionScreen.y * 2;

    for(f = 0; f < fl; f++) {
      flare = object.lensFlares[ f ];

      flare.x = object.positionScreen.x + vecX * flare.distance;
      flare.y = object.positionScreen.y + vecY * flare.distance;

      flare.rotation = 0;
    }

    object.lensFlares[2].y += 0.025;
    object.lensFlares[3].rotation = object.positionScreen.x * 0.5 + THREE.Math.degToRad( 45 );
  }
};
