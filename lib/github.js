var ROOT = 'https://api.github.com/repos/';

module.exports = function github (transport, subspace) {
  return {
    repo: function (name) {
      transport.xhr({ uri: ROOT + name }, handleResponse('repo', subspace));
    },
    commits: function (name, since) {
      transport.xhr({ uri: ROOT + name + '/commits?since=' + since }, handleResponse('commits', subspace));
    }
  };
};

function handleResponse(name, subspace) {
  return function (err, resp, body) {
    if (err) throw err;
    var responseJSON = JSON.parse(body);

    subspace.emit(name, responseJSON);
  };
}
