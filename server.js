// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.json())
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './bower_components')));

var mongoose = require('mongoose');

// require the mongoose configuration file which does the rest for us
require('./server/config/mongoose.js');

// *************Routes**************
// store the function in a variable
var routes_setter = require('./server/config/routes.js');
// invoke the function stored in routes_setter and pass it the "app" variable
routes_setter(app);
// *************End Routes**************

// Setting our Server to Listen on Port: 7000
// app.listen(7000, function () {
//     console.log("listening on port 7000");
// })
app.listen(process.env.PORT || 7000);