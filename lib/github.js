var ROOT = '/api';

module.exports = function github (transport, subspace) {
  return {
    repos: function () {
      return request('/user/repos?sort=pushed');
    },
    repo: function (name) {
      return request('/repos/' + name);
    },
    commits: function (name, since) {
      return request('/repos/' + name + '/commits?since=' + since);
    },
    commit: function (name, sha) {
      return request('/repos/' + name + '/commits/' + sha);
    },
    events: function () {
      return request('/events');
    }
  };

  function request (url) {
    return transport.xhr({ url: ROOT + url, type: 'json' });
  }
};
