// Import JS script dependencies: scrape and makeDate functions
var scrape = require("../scripts/scrape");
var makeDate = require("../scripts/date");

// Import model dependencies: Article
var Article = require("../models/Article");

// Put all functionality for adding, deleting, etc. into a module.export to be used through app
module.exports = {
    // Use fetch to run the scrape function and add all of them into the article collection of the mongoDB
    fetch: function(cb) {
        // run the the scrape function, will return data
        scrape(function(data) {
            // Createa a new articles variable and set it equal to the data return from the scrape function
            var articles = data; 

            // Loop through all the articles and create two properties:
            for (var i = 0; i < articles.length; i++) {
            // Date
                articles[i].date = makeDate();

            // Saved condition, false by default
                articles[i].saved = false; 
            }; 

            // Then run a mongo function
            // Access the Article database, access the collections and insert the articles 
            // Lots of articles
            // Dont care about the order
            Article


        });
    }
};