// server.js
// load the things we need
const express = require('express');
const app = express();
const apiRoutes = require('./router/myrouter');

// use res.render to load up an ejs view file
app.use(express.urlencoded())
app.use(express.json());      
app.use('/', apiRoutes);
//url
//uri

app.listen(8080);
console.log('the server is started at port 8080');
module.exports = app;
