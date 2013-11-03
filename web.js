var app = require('./app'),
    connect = require('connect'),
    port = process.env.PORT || 5000;

connect(app()).listen(port);
