module.exports = function colour(colours) {
  return {
    of: function (language) {
      return colours[language] || 0xffffff;
    }
  };
};
