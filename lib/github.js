var ROOT = '/api';

module.exports = function github (transport, subspace) {
  // TODO make methods config
  return {
    repos: function () {
      transport.xhr({ uri: ROOT + '/user/repos?sort=pushed' }, handleResponse('repos', subspace));
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
    if (err) {
      subspace.emit('failure', 'GitHub: ' + err);
      return;
    }
    var responseJSON = JSON.parse(body);
    subspace.emit(name, responseJSON, repo);
  };
}
