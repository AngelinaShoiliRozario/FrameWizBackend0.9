const passport = require("passport");
const FacebookStrategy = require("passport-facebook");

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "emails", "name",'gender'],
    },
    async function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile); // the profile value will be passed in req.user // different varibles will be passed as the req.user value
    }
  )
);
