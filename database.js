// const Keyv = require("keyv");

// const keyv = new Keyv();

// module.exports = keyv;

const mongoose = require("mongoose");
const mongoURI = require("./config").mongoURI;

const connect = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
    });
    console.log("[DB]: Connected to DB");
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = { connect };
