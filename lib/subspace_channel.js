var emitter = require('emitter');

module.exports = SubspaceChannel;

function SubspaceChannel() {
  emitter(this);
}
