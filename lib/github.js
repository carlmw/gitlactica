var HOST = 'https://api.github.com';

module.exports = function github (transport, subspace) {
  return {
    repo: function (name) {
      transport.xhr({ uri: HOST + '/repos/' + name }, handleRepo(subspace));
    }
  };
};

function handleRepo(subspace) {
  return function (err, resp, body) {
    if (err) throw err;
    var repo = JSON.parse(body);

    subspace.emit('repo', repo);
  };
}
