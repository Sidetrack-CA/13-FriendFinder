
// DEPENDENCIES
var express = require("express");
var bodyParser = require("body-parser");


// EXPRESS CONFIGURATION
// Tells node that we are creating an "express" server
var app = express();

// sets both a dynamic port for heroku and a static port for 127.0.0.1
var PORT = process.env.PORT || 8080;

// Sets up the Express middleware to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// ROUTER
// This is where we link the apiroutes file to handle the routing of get requests
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);


// SERVER PORT LISTENER
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});