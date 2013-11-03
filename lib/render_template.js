module.exports = function (templates, el) {
  return function (template, data) {
    template = template || '/';
    el.innerHTML = templates[template] ? templates[template](data || {}) : '';
    if (typeof(log) !== 'undefined') {
      log('Rendered template ' + template);
    }
  };
};
