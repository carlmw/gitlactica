var handlebars = require('handlebars'),
    fs = require('fs'),
    document = require('./util').global().document;

module.exports = HUD;

function HUD(subspace) {
  this.el = document.createElement('div');
  this.el.className = 'hud';
  document.body.appendChild(this.el);

  subspace.on('show:planet', function (context) {
    this.render(context);
  }.bind(this));
}

// TODO load template with stringify
HUD.template = fs.readFileSync(__dirname + '/templates/hud.handlebars');

HUD.prototype.render = function (context) {
  this.template = handlebars.compile(HUD.template);
  this.render = realRender;
  this.render(context);
};

function realRender(context) {
  this.el.innerHTML = this.template(context);
}
