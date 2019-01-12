module.exports = function (app, db, axios, cheerio) {

    // ----- Creating Review JSON API
    app.get("/api/reviews", (req, res) => {
        db.Review.find({})
            .then(dbReview => { res.json(dbReview) })
            .catch(err => { res.json(err) });
    });

    // ----- Deleting Scraped content from database
    app.delete("/api/reviews", (req, res) => {
        db.Review.remove({}, function (err, doc) {
            if (err) {
                res.json("There was a problem deleting the information to the database.");
            }
            else {
                res.json("Successfully deleted");
            }
        })
    })

    // ----- Saving a Review
    app.put("/api/reviews/:id", (req, res) => {
        db.Review.update({
            id: req.params.id
        }, {
            $set: {
                isSaved: true
            }
        }, (err, edited) => {
            if (err) {res.send(err)}
            else{res.send(edited)}
        })
    })




};