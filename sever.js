// server.js
// load the things we need
var express = require('express');
var app = express();

var apiRoutes = require('./router/myrouter');

// use res.render to load up an ejs view file
app.use('/', apiRoutes);
//url
//uri

app.listen(8080);
console.log('the server is started at port 8080');
module.exports = app;
