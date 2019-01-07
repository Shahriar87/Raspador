module.exports = function (app, db, axios, cheerio) {

    // ----- LOAD INDEX PAGE
    app.get("/", function (req, res) {
        res.render("index");
    });
};