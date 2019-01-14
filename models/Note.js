var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var NoteSchema = new Schema({
  body: {
    type: String,
  },
  review: {
    type: Schema.Types.ObjectId,
    ref: "Review"
  }
});

var Note = mongoose.model("Note", NoteSchema);

// ----- Exporting the Note model
module.exports = Note;
