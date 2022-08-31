const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

// tell passport to use new strategy for google login
passport.use(
  //Here Im mentioning real Client ID and Client secret because I am facing some issues in google oAuth. you use your Clientid and Clientsecret
  new googleStrategy(
    {
      clientID:
        "670690277423-56t78k1pill407ee7gq8p1shnome9qv5.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL:
        "https://verify-auth.herokuapp.com/users/auth/google/callback",
    },

    // find user
    function (accessToken, refreshToken, profile, done) {
      // find a user
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log("error in google strategy-passport", err);
          return;
        }
        console.log(accessToken, refreshToken);
        console.log(profile);

        if (user) {
          return done(null, user);
        } else {
          // if not found, create the user and set it as req.user

          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              // password: crypto.randomBytes(20).toString("hex"),
            },
            function (err, user) {
              if (err) {
                console.log(
                  "error in creating user google strategy-passport",
                  err
                );
                return;
              }

              return done(null, user);
            }
          );
        }
      });
    }
  )
);

module.exports = passport;
