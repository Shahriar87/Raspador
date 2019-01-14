module.exports = function (app, db, axios, cheerio) {

    // ----- Creating Review JSON API
    app.get("/api/reviews", (req, res) => {
        db.Review.find({})
            .then(dbReview => { res.json(dbReview) })
            .catch(err => { res.json(err) });
    });

    // ----- Deleting Scraped content from database
    app.delete("/api/reviews", (req, res) => {
        db.Review.remove({}).exec(function (err, doc) {
            if (err) {
                res.json("There was a problem deleting the information to the database.");
            }
            else {
                res.json("Successfully deleted");
            }
        })
    })

    // ----- Saving a Review
    app.post("/api/reviews/:id", (req, res) => {
        db.Review.updateOne({
            "_id": req.params.id
        }, {
                $set:
                    { "isSaved": true }
            }).then(dbReview => { res.json(dbReview) })
    })

    // ----- Delete Reviews
    app.delete("/api/reviews/:id", (req, res) => {
        db.Review.deleteOne({ "_id": req.params.id })
            .then(dbReview => { res.json(dbReview) })
            .catch(err => { res.json(err) });
    });



};