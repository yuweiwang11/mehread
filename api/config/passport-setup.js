const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
require('dotenv').config()
const googleClientID = process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET

passport.use(
  new GoogleStrategy(
    // options for the google strategy
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: '/auth/google/redirect',
    },
    // passport callback function
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile)
    }
  )
)
