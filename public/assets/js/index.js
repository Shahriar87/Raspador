// ----- Grab Reviews

$.getJSON("/reviews", function (data) {

    // ----- Empltying Review container Div
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


// $(".scrape-new").on("click", function () {

// });