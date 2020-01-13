// Create routes for url endpoints
module.exports = function(router) {
    // Render Homepage
    router.get("/", function(req, res) {
        res.render("home");
    });

    // Render Saved Articles
    router.get("/saved", function(req, res) {
        res.render("saved");
    })
};

