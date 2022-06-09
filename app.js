const express = require("express");
const exhbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

// ===================== this is not yet done ===============
const expressValidator = require("express-validator");
const flash = require("connect-flash");
const session = require("express-session");

// ===================== this is not yet done ===============

// connecting to dbs
mongoose.connect("mongodb://localhost/article_db");

let db = mongoose.connection;

// check connection sucessfully
db.once("open", function () {
  console.log("Connected to Database");
});

// check for db errors
db.on("error", function (err) {
  console.log(err);
});

// initializing the app
const app = express();

//body parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// importing article model
let Article = require("./models/article");
const article = require("./models/article");

//  setting static folder
app.use(express.static(path.join(__dirname, "public")));

// setting template engine
app.engine("handlebars", exhbs.engine());
app.set("view engine", "handlebars");

// creating routes for getting articles
app.get("/", (req, res) => {
  Article.find({}, function (err, articles) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {
        title: "this is Mongo Article",
        articles: articles,
      });
    }
  }).lean();
});

let articles = require("./routes/article_routes");
app.use("/articles", articles);



app.listen(3000, () => {
  console.log("Server is running on port 3000 ...");
});
