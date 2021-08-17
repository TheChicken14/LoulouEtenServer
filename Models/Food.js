const { Schema, model } = require("mongoose");

const Food = new Schema({
  type: {
    type: String,
    required: true,
  },
  by: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("food", Food);
