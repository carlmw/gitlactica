var ROOT = '/api',
    when = require('when'),
    _ = require('lodash');

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
    events: function (login) {
      return when.join(
        request('/users/' + login + '/events'),
        request('/users/' + login + '/received_events')
      ).then(_.flatten).then(sortByDate);
    }
  };

  function request (url) {
    return transport.xhr({ url: ROOT + url, type: 'json' });
  }

  function sortByDate (events) {
    return _.sortBy(events, function (v) {
      return Date.parse(v.created_at);
    });
  }
};
