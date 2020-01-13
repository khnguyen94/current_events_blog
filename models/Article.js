// Import Dependencies
var mongoose = require("mongoose");

// Save a reference to the mongoose Scheme constructor
var Schema = mongoose.Schema;

// Use Schema constructor to create a new UserSchema object
// Equivalent to the model in Sequelize
var ArticleSchema = new Schema({
  // "title": required, string
  title: {
    type: String,
    required: true, 
    unique: true
  },
  // "summary", reuqired, string
  summary: {
    type: String,
    required: true
  },
  // "link": required, string
  link: {
    type: String,
    required: true
  },
  // "date": string
  date: String, 

  // "saved": default false, boolean
  saved: {
    type: Boolean, 
    default: false
  }, 

  // "note": object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Note, object, stores Note ID
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// Use mongoose's model method to create a model from the Schema above
// Call it "Article" using the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
