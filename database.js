// const Keyv = require("keyv");

// const keyv = new Keyv();

// module.exports = keyv;

const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGOURI, {
      useNewUrlParser: true,
    });
    console.log("[DB]: Connected to DB");
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = { connect };
