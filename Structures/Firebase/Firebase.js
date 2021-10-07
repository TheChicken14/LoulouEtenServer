const Firebase = require("firebase-admin");

const serviceAccount = require("../../loulous-app-firebase.json");

Firebase.initializeApp({
  credential: Firebase.credential.cert(serviceAccount),
});

module.exports = Firebase;
