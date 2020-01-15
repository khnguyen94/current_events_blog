// Import general dependencies
var express = require("express");
var cheerio = require("cheer");
var axios = require("axios");
var mongoose = require("mongoose");
var router = express.Router();

// Import model dependencies: Article, Comment
var Article = require("../models/Article");
var Comment = require("../models/Comment");

// Import JS script dependencies: scrape and makeDate functions
var scrape = require("../scripts/scrape");
var makeDate = require("../scripts/date");

// ROUTES

// GET, for scraping "https://www.nytimes.com/section/sports"
router.get("/scrape", function(req, res) {
  // Using axios, grab the HTML body of the URL
  // Run an anon function that uses cheerio to load HTML body into variable
  axios.get("https://www.nytimes.com/section/sports").then(function(body) {
    var $ = cheerio.load(body);

    // Access each article tag and save each title, url, and summary to a variable
    $("article").each(function(i, element) {
      // Save an empty result object
      var result = {};

      // Save the text, summary, and link of each article as properties of the result object
      result.title = $(element)
        .find("h2")
        .text();
      result.summary = $(element)
        .find("p")
        .text();
      result.link =
        "https://www.nytimes.com/section/sports" +
        $(element)
          .find("h2 > a")
          .attr("href");

      // If each article has all 3 attributes, then create new object called articleToAdd and store all 3 properties
      if (result.title && result.summary && result.url) {
        // Access the Article collection and use the result to creat a new document
        Article.create(result)
          .then(function(dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
          });
      }
    });

    // Send message to client
    res.send("Scrape complete");
  });
});

// GET, for getting all articles
router.get("/articles", function(req, res) {
  // Grab every document in the Articles collection
  Article.find({})
    .then(function(dbArticle) {
      // If successful, return dbArticle in JSON
      res.json(dbArticle);
    })
    // Else, catch the error
    .catch(function(err) {
      res.json(err);
    });
});

// GET, for grabbing specific article by ID, populate it with a comment
router.get("/articles/:id", function(req, res) {
  // Get a handle on the id param
  var articleID = req.params.id;

  // Using Article, find the article id matching articleID
  // Populate the comment property of this article
  Article.findOne({ articleID })
    .populate("comment")
    .then(function(dbArticle) {
      // If an article with that articleID was found, return it to the client
      res.json(dbArticle);
    })
    // Else, catch the  an error
    .catch(function(err) {
      res.json(err);
    });
});

// POST, for saving/updating an Articles' note
router.post("/articles/:id", function(req, res) {
  // Get a handle on the info body being passed through
  var articleBody = req.body;

  // Get a handle on the id param being passed through
  var articleID = req.params.id;

  // Access Comment collection and create a new document using articleBody
  Comment.create(articleBody)
    .then(function(dbComment) {
      // If new Comment was created successfully, find the article matching the articleID and update the Article to be associated with the new Comment
      return Article.findOneAndUpdate(
        {
          // Find article at ID
          _id: articleID
        },
        {
          // Update the article.comment property with the dbComment._id
          comment: dbComment._id
        },
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        {
          new: true
        }
      );
    })
    // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
    .then(function(dbArticle) {
      // If an article with that articleID was found, return it to the client
      res.json(dbArticle);
    })
    // Else, catch the  an error
    .catch(function(err) {
      res.json(err);
    });
});

// Export the router
module.exports = router;
