// ----- Grab Reviews

$(document).ready(() => {

    // ----- Event handlers
    $(document).on("click", "#clear", deleteReview);
    $(document).on("click", ".scrape-new", scrapeReview);

    $(".save").on("click", function () {
        var thisId = $(this).attr("data-id");
        // console.log(thisId);
        saveReview(thisId);
    });

    $(".delete").on("click", function () {
        var thisId = $(this).attr("data-id");
        // console.log(thisId);
        delSelectedReview(thisId);
    });

    $(".notesave").on("click", function () {
        var thisId = $(this).attr("data-id");
        if (!$("#noteText" + thisId).val()) {
            alert("please write something")
        } else {
            noteAdd(thisId);
        }
    });

    // ----- Modal Display
    $(".noteadd").on("click", function () {
        var thisId = $(this).attr("data-id");
        console.log(thisId);
        $("#noteModal" + thisId).modal("show");
    });


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

    // ----- Scrape Review
    function scrapeReview(event) {
        event.stopPropagation();

        $.ajax({
            method: "GET",
            url: "/scrape"
        }).done(function () {
            window.location = "/";
        })
    };

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
    };

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
    };

    // ----- Adding Notes
    function noteAdd(data) {
        $.ajax({
            method: "POST",
            url: "/api/notes/" + data,
            data: {
                text: $("#noteText" + data).val()
            }
        }).done(function (data) {
            console.log(data)
            $("#noteText" + thisId).val("");
            $(".modalNote").modal("hide");
            window.location = "/saved"
        });
    };
});