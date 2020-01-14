// Create a function that creates a date
var makeDate = function() {
    // Create a variable that is a new date
    var d = new Date();

    // Create a variable that holds the formatted date, final version of the datetime to be used added to our article object and stored in to db
    var formattedDate = "";

    // Access d, and format: month, date, and year and add to the formattedDate variable
    // Month will show up as 0 index by default so add 1 to get actual month
    formattedDate += (d.getMonth() + 1) + "_"; 

    formattedDate += d.getDate() + "_"; 

    formattedDate += d.getFullYear(); 

    // Have funtion return the formattedDate variable
    return formattedDate; 
};

// Export makeDate function
module.exports = makeDate; 