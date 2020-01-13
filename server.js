// Import dependencies
var express = require("express");
var bodyParser = require("body-parser");
var expressHandlebars = require("express-handlebars");
var mongoose = require("mongoose");

// Import variables
// Database
// var db = require("./models");

// Define the port
var PORT = process.env.PORT || 3000;

// Create an instance of Express app, give it a variable handle
var app = express();

// Set up an Express Router
var router = express.Router();

// Set up our Express App router to use our html routes
require("./config/routes/htmlroutes")(router);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Let public folder be a static directory
app.use(express.static("public"));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE, PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Set up bodyParser to be used in our Express App
app.use(bodyParser.urlencoded({
    extended: false
}));

// Set up Handlebars connection to Express App
app.engine(
  "handlebars",
  expressHandlebars({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
// require("./config/routes/apiRoutes")(app);
// require("./config/routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Have every request go through our Router middleware
app.use(router);

// If deployed, use the deloyed database. Otherwise use the local mongoHeadlines database
// Set db equal to database URI OR the local database
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Connect mongoose to our database
mongoose.connect(db, function(err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("mongoose connection is successful");
    }
});

// Starting the server

app.listen(PORT, function() {
  console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  );
});

module.exports = app;
