const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const db = require("./database");

const indexRouter = require("./routes/index");
const hasFood = require("./routes/hasFood");
const giveFood = require("./routes/giveFood");
const undoFeeding = require("./routes/undoFeeding");
const deleteHistory = require("./routes/deleteHistory");
const feedingHistory = require("./routes/feedingHistory");

const createPet = require("./routes/Pet/createPet");
const feedPet = require("./routes/Pet/feedPet");
const getPetStatus = require("./routes/Pet/getPetStatus");
const deletePet = require("./routes/Pet/deletePet");
const getPetProfile = require("./routes/Pet/getPetProfile");
const updatePet = require("./routes/Pet/updatePet");
const uploadPetPhoto = require("./routes/Pet/uploadPetPhoto");

const userInfo = require("./routes/User/userInfo");

const deleteItem = require("./routes/Food/deleteItem");
const getFoodHistory = require("./routes/Food/getFoodHistory");

const createInvite = require("./routes/Invitation/createInvite");
const acceptInvite = require("./routes/Invitation/acceptInvite");
const getInvites = require("./routes/Invitation/getInvites");
const deleteInvite = require("./routes/Invitation/deleteInvite");
const getInviteInfo = require("./routes/Invitation/getInviteInfo");

const getImage = require("./routes/Image/getImage");

const createQrCode = require("./routes/QRCodes/createQrCode");
const getQrCode = require("./routes/QRCodes/getQrCode");
const getAllQrCodes = require("./routes/QRCodes/getAllQrCodes");

const googleAuth = require("./routes/authentication");
const passport = require("./Structures/Passport");

const checkApiKey = require("./Middleware/checkApiKey");

const app = express();

db.connect();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

if (process.env.PRODUCTION) {
  app.set("trust proxy", true);
}

app.use(checkApiKey);
app.use(passport.initialize());

app.use("/", indexRouter);
app.use("/loulou/hasFood", hasFood);
app.use("/loulou/giveFood", giveFood);
app.use("/loulou/undoFeeding", undoFeeding);
app.use("/loulou/removeItem", deleteHistory);
app.use("/loulou/history", feedingHistory);
app.use("/auth", googleAuth);

app.use("/pet/create", createPet);
app.use("/pet/feed", feedPet);
app.use("/pet/status", getPetStatus);
app.use("/pet/delete", deletePet);
app.use("/pet/profile", getPetProfile);
app.use("/pet/profile/update", updatePet);
app.use("/pet/upload/photo", uploadPetPhoto);

app.use("/user/info", userInfo);

app.use("/food/delete", deleteItem);
app.use("/food/history", getFoodHistory);

app.use("/invite/create", createInvite);
app.use("/invite/accept", acceptInvite);
app.use("/invite/list", getInvites);
app.use("/invite/delete", deleteInvite);
app.use("/invite/info", getInviteInfo);

app.use("/image/get", getImage);

app.use("/qrcodes/create", createQrCode);
app.use("/qrcodes/get", getQrCode);
app.use("/qrcodes/all", getAllQrCodes);

module.exports = app;
