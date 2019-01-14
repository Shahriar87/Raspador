// ----- Grab Reviews

$(document).ready(function () {

    // ----- Delete Review
    function deleteReview(event) {
        event.stopPropagation();

        $.ajax({
            method: "DELETE",
            url: "/api/reviews"
        }).then(getReview);
    };

    $(document).on("click", "#clear", deleteReview);

    // ----- Scrape Review
    function scrapeReview(event) {
        event.stopPropagation();

        $.ajax({
            method: "GET",
            url: "/scrape"
        })
    }

    $(document).on("click", ".scrape-new", scrapeReview);


    // ----- Save Review
    function saveReview(data) {
        $.ajax({
            method: "PUT",
            url: "/api/reviews/" + data.id,
            data: data
        })
    }

    $(".save").on("click", function() {
        var thisId = $(this).attr("data");
        var reviewId = {id: thisId};
        console.log(this);
        saveReview(reviewId);
    });

    // ----- Initial Page Reload and Dom Building
    // getReview();

});