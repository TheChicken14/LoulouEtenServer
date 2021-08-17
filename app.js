const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const db = require("./database");

const indexRouter = require("./routes/index");
const hasFood = require("./routes/hasFood");
const giveFood = require("./routes/giveFood");
const undoFeeding = require("./routes/undoFeeding");
const feedingHistory = require("./routes/feedingHistory");
const checkApiKey = require("./Middleware/checkApiKey");

const app = express();

db.connect();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(checkApiKey);

app.use("/", indexRouter);
app.use("/loulou/hasFood", hasFood);
app.use("/loulou/giveFood", giveFood);
app.use("/loulou/undoFeeding", undoFeeding);
app.use("/loulou/history", feedingHistory);

module.exports = app;
