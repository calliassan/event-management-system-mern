const mongoose = require("mongoose");
const eventschema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "eventuser",
    index: true,
  },
  eventName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100,
  },
  organiser: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100,
  },
  location: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100,
  },
  dateTime: {
    type: Date,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100,
  },
  Description: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100,
  },
  availaleSeats: {
    type: Number,
    required: true,
    trim: true,
  },
  categoryTags: {
    type: String,
    required: true,
    trim: true,
  },
});
const eventmodel = mongoose.model("event", eventschema);
module.exports = eventmodel;
