var _ = require('lodash');

module.exports = function languageColourMapper (input) {
  return _(input).reduce(function (memo, item, language) {
    var colour = item.color;
    if (item.group) {
      colour = input[item.group].color;
    }
    if(!colour) {
      colour = '#ffffff';
    }
    colour = parseInt(colour.slice(1), 16);

    memo[language] = colour;
    if (item.primary_extension) {
      memo[item.primary_extension] = colour;
    }
    if (item.extensions) {
      item.extensions.forEach(function (extension) {
        memo[extension] = colour;
      });
    }
    return memo;
  }, {});
};
