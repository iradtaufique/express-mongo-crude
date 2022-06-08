const express = require("express");
const exhbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

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

// routes for getting articles
app.get("/add/article", (req, res) => {
  res.render("add_article", { title: "Add Article" });
});

//  route for adding post
app.post("/add/article", function (req, res) {
  // creating new object which point to Article model
  let article = new Article();
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  article.save(function (err) {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect("/");
    }
  });

  console.log(req.body.title);
  return;
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 ...");
});
