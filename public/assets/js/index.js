// ----- Grab Reviews

$(document).ready(function () {

    // ----- Delete Review
    function deleteReview(event) {
        event.stopPropagation();

        $.ajax({
            method: "DELETE",
            url: "/api/reviews"
        }).done(function (data) {
            window.location = "/"
        })
    };

    $(document).on("click", "#clear", deleteReview);

    // ----- Scrape Review
    function scrapeReview(event) {
        event.stopPropagation();

        $.ajax({
            method: "GET",
            url: "/scrape"
        }).done(function () {
            window.location = "/";
        })
    }

    $(document).on("click", ".scrape-new", scrapeReview);


    // ----- Save Review
    function saveReview(data) {
        // console.log(data);
        $.ajax({
            method: "POST",
            url: "/api/reviews/" + data,
            data: data
        }).done(function () {
            window.location = "/";
        })
    }

    $(".save").on("click", function () {
        var thisId = $(this).attr("data-id");
        var reviewId = { id: thisId };
        // console.log(thisId);
        saveReview(thisId);
    });


    // ----- Delete Selected Saved Review
    function delSelectedReview(data) {
        // console.log(data);
        $.ajax({
            method: "DELETE",
            url: "/api/reviews/" + data,
            data: data
        }).done(function () {
            window.location = "/saved";
        })
    }

    $(".delete").on("click", function () {
        var thisId = $(this).attr("data-id");
        var reviewId = { id: thisId };
        // console.log(thisId);
        delSelectedReview(thisId);
    });

});