var handlebars = require('handlebars'),
    document = require('./utils').global().document;

module.exports = HUD;

function HUD(subspace) {
  this.el = document.createElement('div');
  this.el.className = 'hud';
  document.body.appendChild(this.el);
}

// TODO load template with stringify
HUD.template = '{{name}}';

HUD.prototype.render = function (context) {
  this.template = handlebars.compile(HUD.template);
  this.render = realRender;
  this.render(context);
};

function realRender(context) {
  this.el.innerHTML = this.template(context);
}
