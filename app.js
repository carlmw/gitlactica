var connect = require('connect'),
    rewrite = require('connect-modrewrite'),
    redirect = require('connect-redirection'),
    everyauth = require('everyauth'),
    url = require('url'),
    proxy = require('proxy-middleware'),
    fs = require('fs');

everyauth.github
  .appId(process.env.GITHUB_CLIENT_ID)
  .appSecret(process.env.GITHUB_CLIENT_SECRET)
  .findOrCreateUser(function (session, accessToken, accessTokenExtra, ghUser) {
    return session.accessToken = accessToken;
  })
  .redirectPath(function (req) {
    var protocol = (req.headers.host.match(/^localhost/)) ? 'http' : 'https';
    console.log(protocol);
    return protocol + '://' + req.headers.host + '/repos';
  });

module.exports = function (mode) {
  var app = connect()
    .use(rewrite([
      '^/repos(/[^/]+/[^/]+)? /'
    ]))
    .use(connect.static('dist'))
    .use(connect.urlencoded())
    .use(connect.query())
    .use(connect.json())
    .use(connect.cookieParser('e5f1143'))
    .use(connect.session())
    .use(redirect())
    .use('/api', function (req, res, next) {
      // Add our OAuth access token to the subsequent proxied request
      if (req.session.accessToken) {
        req.headers.authorization = 'token ' + req.session.accessToken;
      }
      next();
    })
    .use('/api', proxy(url.parse('https://api.github.com')));

  if ('test' === mode) {
    // Skip OAuth for integration testing
    app.use('/auth/github', function (req, res) {
      req.session.accessToken = 'herpderp';
      res.redirect('/repos');
    });
  }

  app.use(everyauth.middleware());

  return app;
};
