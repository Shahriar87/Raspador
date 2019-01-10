module.exports = function (app, db, axios, cheerio) {

    app.get("/scrape", function (req, res) {
        axios.get("https://www.cnet.com/reviews/").then(function (response) {
            var $ = cheerio.load(response.data);

            $("div.infoContainer").each(function (i, element) {
                var result = {};

                result.title = $(this)
                    .children("a")
                    .children("h4")
                    .text().trim();
                result.brief = $(this)
                    .children("div.description")
                    .text().trim();
                result.price = $(this)
                    .children("div.description")
                    .children("a")
                    .text().trim();
                result.link = $(this)
                    .children("a")
                    .attr("href").trim();

                db.Review.remove({}, function () {
                    db.Review.create(result)
                        .then(function (dbReview) {
                            console.log(dbReview);
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                })
            });
            res.redirect('/');
        });
    });

    app.get("/reviews", function (req, res) {
        db.Review.find({})
            .then(function (dbReview) {
                res.json(dbReview);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

};