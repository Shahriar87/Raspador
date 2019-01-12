// ----- Importing all Dependancies
var express = require("express");
var exphbs = require("express-handlebars");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// ----- Importing all modesl
var db = require("./models");

var PORT = 8080;

var app = express();

// ----- Configuring middlewares

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// ----- Handlebars
app.engine(
    "hbs",
    exphbs({
        extname: '.hbs',
        defaultLayout: "main"
    })
);
app.set("view engine", "hbs");

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scavangerOfReviews";
mongoose.connect(MONGODB_URI);

// ----- Routes
require("./routes/apiRoutes")(app, db, axios, cheerio);
require("./routes/viewRoutes")(app, db, axios, cheerio);

// ----- PORT listening
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});