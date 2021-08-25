const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const AppleStrategy = require("@nicokaiser/passport-apple").Strategy;
const fs = require("fs");
const path = require("path");

const prisma = require("./Prisma");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_CLIENTSECRET,
      callbackURL: "/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await prisma.user.findFirst({
        where: {
          googleId: profile.id,
        },
      });

      if (user) {
        done(null, user);
      } else {
        const newUser = await prisma.user.create({
          data: {
            email: profile.emails[0].value,
            name: profile.name.givenName + " " + profile.name.familyName,
            googleId: profile.id,
          },
        });
        done(null, newUser);
      }
    }
  )
);

module.exports = passport;
