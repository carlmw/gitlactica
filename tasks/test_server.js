var nock = require('nock'),
    app = require('../app'),
    connect = require('connect');

module.exports = function (grunt) {
  var server;
  grunt.registerTask('start_test_server', function() {
    nock.disableNetConnect();
    nock('https://api.github.com')
      .get('/repos/carlmw/gitlactica')
      .reply(200, { full_name: 'carlmw/gitlactica', language: 'JavaScript' })
      .get('/users/carlmw/events')
      .reply(200, require('./responses/users/carlmw/events'))
      .get('/users/carlmw/received_events')
      .reply(200, require('./responses/users/carlmw/received_events'))
      .get('/repos/carlmw/gitlactica/commits/d94709d1942c14fe4bd06e24e9639ed30232b58e')
      .reply(200, require('./responses/repos/carlmw/gitlactica/commits/d94709'))
      .get('/repos/carlmw/gitlactica/commits/8b07ccd197085a2c9aac1cc04aef93750aafd49d')
      .reply(200, require('./responses/repos/carlmw/gitlactica/commits/8b07cc'))
      .get('/user/repos?sort=pushed')
      .reply(200, [{
        name: 'gitlactica',
        full_name: 'carlmw/gitlactica'
      }]);

    server = connect(app('test')).listen(8091);
  });
  grunt.registerTask('close_test_server', function () {
    server.close();
    nock.restore();
    nock.enableNetConnect();
  });
};
