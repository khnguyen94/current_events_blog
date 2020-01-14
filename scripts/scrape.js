// Import dependencies
var cheerio = require("cheerio");
var axios = require("axios");

// Pieces of information to scrape:
// Article title
// URL link
// Summary

// Create a function that scrapes the NYT sports section to get articles and all relevant information to display
var scrape = function(cb) {
  // Using axios, grab the HTML body of the URL
  // Run an anon function that uses cheerio to load HTML body into variable
  axios.get("https://www.nytimes.com/section/sports").then(function(body) {
    var $ = cheerio.load(body);

    // Create a list to hold all of the scraped articles to be added to the database
    var articles = [];

    // Access each article tag and save each title, url, and summary to a variable
    $("article").each(function(i, element) {
      // Save the text and href of each link enclosed in the current element
      const title = $(element)
        .find("h2")
        .text();
      const summary = $(element)
        .find("p")
        .text();
      const url =
        "https://www.nytimes.com/section/sports" +
        $(element)
          .find("h2 > a")
          .attr("href");

      // If each article has all 3 attributes, then create new object called articleToAdd and store all 3 properties
      if (title && summary && url) {
        var articleToAdd = {
          title: title,
          summary: summary,
          url: url
        };
      }

      // Push each articleToAdd to the articles array
      articles.push(articleToAdd);
    });

    // Run a callback function that sends us the array of new articles
    cb(articles);
  });
};

// Export the scrape function 
module.exports = scrape; 
