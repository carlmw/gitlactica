var ROOT = '/api';

module.exports = function github (transport, subspace) {
  // TODO make methods config
  return {
    repos: function () {
      transport.xhr({ uri: ROOT + '/user/repos' }, handleResponse('repos', subspace));
    },
    repo: function (name) {
      transport.xhr({ uri: ROOT + '/repos/' + name }, handleResponse('repo', subspace));
    },
    commits: function (name, since) {
      transport.xhr({ uri: ROOT + '/repos/' + name + '/commits?since=' + since }, handleResponse('commits', subspace, name));
    },
    commit: function (name, sha) {
      transport.xhr({ uri: ROOT + '/repos/' + name + '/commits/' + sha }, handleResponse('commit', subspace));
    }
  };
};

function handleResponse(name, subspace, repo) {
  return function (err, resp, body) {
    var responseJSON = JSON.parse(body);
    if (err) return subspace.emit('failure', 'GitHub Error: ' + responseJSON.message);
    subspace.emit(name, responseJSON, repo);
  };
}
