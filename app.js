var connect = require('connect'),
    everyauth = require('everyauth'),
    url = require('url'),
    proxy = require('proxy-middleware'),
    fs = require('fs');

everyauth.github
  .appId(process.env.GITHUB_CLIENT_ID)
  .appSecret(process.env.GITHUB_CLIENT_SECRET)
  .findOrCreateUser(function (session, accessToken, accessTokenExtra, ghUser) {
    session.accessToken = accessToken;
    return session.uid = ghUser.login;
  })
  .redirectPath('/');

var app = connect()
  .use(connect.static('dist'))
  .use(connect.urlencoded())
  .use(connect.query())
  .use(connect.json())
  .use(connect.cookieParser('e5f1143'))
  .use(connect.session())
  .use(everyauth.middleware())
  .use('/api', proxy(url.parse('https://api.github.com')));

module.exports = app;
