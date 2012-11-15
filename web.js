/// Module dependencies.
var express = require('express')
  // , io = require('socket.io')
  , app = express()
  , fs = require('fs')
  , http = require('http');

// Configuration
require('./config').configure(express, app);

function getPublicFile(res, file) {
  fs.readFile('./public/' + file, function(err, data) {
    if (err) throw err;
    res.send(data);
  });
}

// Routes.
// Public file routes.
app.get('/sitemap.xml', function(req, res) {
  getPublicFile(res, 'sitemap.xml');
});

app.get('/robots.txt', function(req, res) {
  getPublicFile(res, 'robots.txt');
});

// Home routes.
var homeController = require('./controllers/homeController.js');
var weltmeisterController = require('./controllers/weltmeisterController.js');
app.get('/', homeController.default);
app.get('/editor', homeController.editor);

app.get('/view', homeController.view);

app.post('/wm/save',weltmeisterController.save);
app.get('/wm/browse',weltmeisterController.browse);
app.get('/wm/glob',weltmeisterController.glob);
// Only listen on $ node app.js
if (!module.parent || module.parent.filename.indexOf('node-dev') > -1) {
  var server = app.listen(process.env.PORT || process.env.PORT_WWW || 5000);

  //console.log("Express server listening", server.address().port);
  console.log("Express server started.");
}
