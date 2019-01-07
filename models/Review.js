var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    brief: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    link: {
        type: String,
        required: true
    },
    notes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Note"
        }
    ]
});

var Review = mongoose.model("Review", ReviewSchema);

// ----- Exporting Review model
module.exports = Review;