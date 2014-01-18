var connect = require('connect'),
    rewrite = require('connect-modrewrite'),
    redirect = require('connect-redirection'),
    everyauth = require('everyauth'),
    url = require('url'),
    proxy = require('proxy-middleware'),
    fs = require('fs');

if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
  console.error("You must set a GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET");
}

everyauth.github
  .appId(process.env.GITHUB_CLIENT_ID)
  .appSecret(process.env.GITHUB_CLIENT_SECRET)
  .scope('repo')
  .findOrCreateUser(function (session, accessToken) {
    return session.accessToken = accessToken;
  })
  .redirectPath(function (req) {
    return whichProtocol(req) + '://' + req.headers.host + '/playback';
  });

module.exports = function (mode) {
  var app = connect()
    .use(redirect())
    .use(redirectToHttps)
    .use(rewrite([
      '^/playback /'
    ]))
    .use(connect.static('dist'))
    .use(connect.urlencoded())
    .use(connect.query())
    .use(connect.json())
    .use(connect.cookieParser('e5f1143'))
    .use(connect.session())
    .use('/api', addAccessToken)
    .use('/api', proxy(url.parse('https://api.github.com')));

  if ('test' === mode) {
    // Skip OAuth for integration testing
    app.use('/auth/github', function (req, res) {
      req.session.accessToken = 'herpderp';
      res.redirect('/playback');
    });
  }

  app.use(everyauth.middleware());

  return app;
};

function addAccessToken (req, res, next) {
  // Add our OAuth access token to the subsequent proxied request
  if (req.session.accessToken) {
    req.headers.authorization = 'token ' + req.session.accessToken;
  }
  next();
}

function redirectToHttps (req, res, next) {
  // Redirect to https 
  var reqType = req.headers["x-forwarded-proto"];
  if (!reqType || reqType === 'https') next();
  else res.redirect("https://" + req.headers.host + req.url);
}

function whichProtocol (req) {
  return (req.headers.host.match(/^localhost/)) ? 'http' : 'https';
}
