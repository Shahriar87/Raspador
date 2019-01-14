module.exports = function (app, db, axios, cheerio) {

    // ----- Creating Review JSON API
    app.get("/api/reviews", (req, res) => {
        db.Review.find({})
            .then(dbReview => { res.json(dbReview) })
            .catch(err => { res.json(err) });
    });

    // ----- Deleting Scraped content from database
    app.delete("/api/reviews", (req, res) => {
        db.Review.deleteMany({ "isSaved": false }).exec(function (err, doc) {
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

    // ----- Creating a Review
    app.post("/api/notes/:id", (req, res) => {
        var Note = new Note({
            body: req.body.text,
            article: req.params.id
        });
        console.log(req.body)
        Note.save((error, note) => {
            if (error) console.log(error)
            else {
                db.Review.findOneAndUpdate({ "_id": req.params.id }, { $push: { "notes": note } })
                    .then(dbNote => { res.send(dbNote) })
                    .catch(err => { res.send(err) });
            }
        });
    });

};