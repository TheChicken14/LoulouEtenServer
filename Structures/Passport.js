const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../Models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_CLIENTSECRET,
      callbackURL: "/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({
        googleId: profile.id,
      });

      if (user) {
        done(null, user);
      } else {
        const newUser = new User({
          email: profile.emails[0].value,
          name: profile.name.givenName + " " + profile.name.familyName,
          googleId: profile.id,
        });
        done(null, await newUser.save());
      }
    }
  )
);

module.exports = passport;
