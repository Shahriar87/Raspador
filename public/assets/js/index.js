// ----- Grab Reviews

$(document).ready(function () {

    function getReview() {
        $.getJSON("/api/reviews", data => {

            // ----- Emptying Review container Div
            $(".review-container").empty();

            // ----- Dynamically creating the cards for each Hot Product
            var card = $("<div>");
            card.addClass("card");
            for (var i = 0; i < data.length; i++) {
                card.append("<div class='card-header bg-primary'><h3><a class='review-link text-white' target='_blank' rel='noopener noreferrer' href='https://www.cnet.com"
                    + data[i].link + "'>" + data[i].title + "</a><a class='btn btn-success save float-right'>Save Review</a></h3></div>");

                card.append("<div class='card-body'>" + data[i].brief + "</div>");
            }

            $(".review-container").append(card);
            // console.log(data);
        });
    };

    // ----- Delete Review
    function deleteReview(event) {
        event.stopPropagation();

        $.ajax({
            method: "DELETE",
            url: "/api/reviews"
        }).then(getReview);
    }

    $(document).on("click", "#clear", deleteReview);

    // ----- Scrape Review
    function scrapeReview(event) {
        event.stopPropagation();

        $.ajax({
            method: "GET",
            url: "/scrape"
        }).then(getReview);
    }

    $(document).on("click", "#scrape", scrapeReview);

    getReview();
});