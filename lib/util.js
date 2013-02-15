module.global = function () {
  return 'undefined' != typeof window ? window : global;
};
