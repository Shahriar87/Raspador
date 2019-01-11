module.exports = function (app, db, axios, cheerio) {

    // ----- Scraping contents
    app.get("/scrape", (req, res) => {
        axios.get("https://www.cnet.com/reviews/").then(function (response) {
            var $ = cheerio.load(response.data);

            $("div.infoContainer").each(function () {
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

                db.Review.remove({}, () => {
                    db.Review.create(result)
                        .then(dbReview => { console.log(dbReview) })
                        .catch(err => { console.log(err) });
                })
            })
        }).catch(err => { console.log(err) });
    });

    // ----- LOAD INDEX PAGE
    app.get("/", (req, res) => { res.render("index") });

};
















    // // ----- Scraping contents
    // app.get("/scrape", (req, res) => {
    //     axios.get("https://www.cnet.com/reviews/").then(function (response) {
    //         var $ = cheerio.load(response.data);

    //         $("div.infoContainer").each(function () {
    //             var result = {};

    //             result.title = $(this)
    //                 .children("a")
    //                 .children("h4")
    //                 .text().trim();
    //             result.brief = $(this)
    //                 .children("div.description")
    //                 .text().trim();
    //             result.price = $(this)
    //                 .children("div.description")
    //                 .children("a")
    //                 .text().trim();
    //             result.link = $(this)
    //                 .children("a")
    //                 .attr("href").trim();

    //             db.Review.remove({}, () => {
    //                 db.Review.create(result)
    //                     .then(dbReview => { console.log(dbReview) })
    //                     .catch(err => { console.log(err) });
    //             })
    //         })
    //     }).then(function () {
    //         res.redirect('/');
    //     }).catch(err => { console.log(err) });
    // });