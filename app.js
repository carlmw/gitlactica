var connect = require('connect'),
    http = require('http'),
    port = process.env.PORT || 5000;

var app = connect()
  .use(connect.static('dist'));

http.createServer(app).listen(port);
