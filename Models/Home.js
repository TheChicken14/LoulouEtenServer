const { Schema, model } = require("mongoose");

const Home = new Schema({
  members: [
    {
      id: String,
      addedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  owner: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("home", Home);
