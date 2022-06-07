const express = require("express");
const exhbs = require("express-handlebars");
const mongoose = require("mongoose");

// connecting to dbs
mongoose.connect('mongodb://localhost/article_db');

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

// routes for adding articles
app.get("/add", (req, res) => {
  let articles = [
    {
      id: 1,
      name: "aritcle 1",
      title: "title 1",
    },
    {
      id: 2,
      name: "aritcle 2",
      title: "title 2",
    },
    {
      id: 3,
      name: "aritcle 3",
      title: "title 3",
    },
  ];
  res.render("add_article", { articles: articles });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 ...");
});
