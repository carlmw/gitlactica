var THREE = require('three'),
    TWEEN = require('../../vendor/tween');

module.exports = genericOrbit;

function genericOrbit(node, pivot, axis, rpm) {
  "use strict";

  var pivotMatrix = new THREE.Matrix4(),
      nodeLocalMatrix = new THREE.Matrix4(),
      rotationMatrix = new THREE.Matrix4(),
      m1 = new THREE.Matrix4(),
      m2 = new THREE.Matrix4(),
      tween = new TWEEN.Tween({ angle: 0 });

  pivotMatrix.makeTranslation(pivot.x, pivot.y, pivot.z);

  // Parent the nodeLocalMatrix to the pivot
  m1.getInverse(pivotMatrix);
  nodeLocalMatrix.multiplyMatrices(m1, node.matrix);

  tween
    .to({angle: Math.PI * 2}, 60000 / rpm)
    .repeat(Number.POSITIVE_INFINITY)
    .onUpdate(function () {
      // node world matrix = (pivot * rotation) * node local matrix
      rotationMatrix.makeRotationAxis(axis, this.angle);
      m1.multiplyMatrices(pivotMatrix, rotationMatrix);
      node.matrix.copy(nodeLocalMatrix);
      node.applyMatrix(m1);
    })
    .start();

  return tween;
}
