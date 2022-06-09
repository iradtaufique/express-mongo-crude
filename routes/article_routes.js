const express = require("express");
const route = express.Router();


// bring in the article model
let Article = require("../models/article");


// routes for getting articles
route.get("/add", (req, res) => {
  res.render("add_article", { title: "Add Article" });
});

//  route for adding post
route.post("/add", function (req, res) {
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

// get single article
route.get("/:id", function (req, res) {
  Article.findById(req.params.id, (err, article) => {
    res.render("article_details", {
      article: article,
    });
  }).lean();
});

// Edit article route
route.get("/edit/:id", (req, res) => {
  Article.findById(req.params.id, (err, article) => {
    res.render("edit_article", {
      article: article,
    });
  }).lean();
}); 


route.post("/edit/:id", (req, res) => {
  let article = {};
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  // query to match article
  let query = { _id: req.params.id };
  Article.update(query, article, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

// route for deleting article
route.delete("/delete/:id", (req, res) => {
  let query = { _id: req.params.id };
  // removing article
  Article.remove(query, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Deleted Successfully");
    }
  });
});


module.exports = route