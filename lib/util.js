/*global window */
module.exports = {
  global: global,
  document: document
};

function global () {
  return 'undefined' !== typeof window ? window : global;
}

function document () {
  return global().document;
}
