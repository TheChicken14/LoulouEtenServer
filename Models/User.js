const { Schema, model } = require("mongoose");

const User = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
    required: true,
  },
});

module.exports = model("user", User);
