// Import all general dependencies: express, router
var express = require("express");
var router = express.Router();

// Import models: Article, Comment
var Article = require("../models/Article");
var Comment = require("../models/Comment");

// GET, for retrieving all comments from the database
router.get("/comment", function(req, res) {
    // Find all comments
    Comment.find({})
    .then(function(dbComment) {
        // If successful, return all comments in json format
        res.json(dbComment);
    })
    // Else, catch the error
    .catch(function(err) {
        res.json(err);
    });
    ;
});

// POST, for creating new comments and adding it to the associated article 
router.get("/comment", function(req, res) {
    // Get a handle on the new comment being created
    var newComment = req.body.comment; 
    // Get a handle on the articleID
    var articleID = req.params.id; 

    // Access the Comment database and create a new comment using the variable above
    Comment.create({ comment: newComment})
    // Then, access the Article database and update the comment of the associated article via the articleID
    .then(function(dbComment) {
        return Article.findOneAndUpdate(
            {_id: articleID}, 
            {comment: dbComment._id}, 
            {new: true});
    })
    // If successful, return the updated Article 
    .then(function(dbArticle) {
        res.json(dbArticle);
    })
    // Else, catch the error
    .catch(function(err) {
        res.json(err);
    }) 
});

// POST, for updating an existing article with a new comment
router.get("/articles/:id", function(req, res) {
    // Get a handle on the articleID
    var articleID = req.params.id; 

    // Access the Article database and find the article with the articleID
    Article.findOne({ _id: articleID })
      // Populate all of the notes associated with it
      .populate("note")
      // If successful, return the updated Article 
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      // Else, catch the error
      .catch(function(err) {
        res.json(err);
      });
  });

// DELETE, for deleteing an existing comment tied to a article 
router.get("/comment", function(req, res) {
    // Get a handle on the articleID
    var articleID = req.params.id; 

    // Access th 
    Comment.deleteOne({_id: articleID})
    // If we were able to successfully delete an article then send a response back to the user
    .then(function(data) {
        // Access the modal and display success message
        $($).text("Deletion successful!");
    })
    // Else, catch the error
    .catch(function(err) {
        res.json(err); 
    })
});

// Export the router