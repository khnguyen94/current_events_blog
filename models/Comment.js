var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var CommentSchema = new Schema({
  // "headlineID": objectID, reference to Article
  _headlineID: {
      type: Schema.Types.ObjectId, 
      ref: "Article"
  },
  // "date": string
  date: String, 
  // `body` is of type String
  commentText: String
});

// This creates our model from the above schema, using mongoose's model method
var Comment = mongoose.model("Note", CommentSchema);

// Export the Note model
module.exports = Comment;
