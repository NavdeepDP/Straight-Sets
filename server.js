// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");

// Set handlebars
var exphbs = require("express-handlebars");
const handlebars = require("handlebars");
const {
    allowInsecurePrototypeAccess,
  } = require("@handlebars/allow-prototype-access");

//Set up express-session and passport
// =============================================================
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");


// import db
var db = require("./models");

// controllers
const coachesController = require("./controllers/coachController");
const playersController = require("./controllers/playerController");
const feedbackPostController = require("./controllers/feedbackPostController");
const lessonRequestController = require("./controllers/lessonRequestController");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;


//MIDDLEWARE
// =============================================================
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// set up express-handlebars
app.engine(
    "handlebars",
    exphbs({
      defaultLayout: "main",
      handlebars: allowInsecurePrototypeAccess(handlebars),
    })
  );
app.set("view engine", "handlebars");

//keep track of user's login session
//===================================================================
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


handlebars.registerHelper('dateFormat', require('handlebars-dateformat'));


app.use(coachesController);
app.use(playersController);
app.use(feedbackPostController);
app.use(lessonRequestController);

//API routes
app.get("/api/config", (req, res) => {
    res.json({
        success: true
    });
});

app.get("/", function (req, res) {
    res.render("index");
});

db.sequelize.sync().then(function(){
//db.sequelize.sync({force:true}).then(function(){
    app.listen(PORT, function () {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});



