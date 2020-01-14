// Create a function that gets the date
var makeDate = function() {
  // Create a variable to hold the date
  var d = new Date();

  // Create a variable to hold the formattedDate
  var formattedDate = "";

  // Access d to get: month, date, and year and add to formattedDate
  // Month is in 0 index so add 1 to get actual month
  formattedDate += d.getMonth() + 1 + "_";

  formattedDate += d.getDate() + "_";

  formattedDate += d.getFullYear();

  // have the function return the formattedDate
  return formattedDate; 
};

// Export makeDate function
module.exports = makeDate; 
