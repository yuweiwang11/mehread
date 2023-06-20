const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

const User = require('../models/Users')
require('dotenv').config()

const googleClientID = process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user)
  })
})

passport.use(
  new GoogleStrategy(
    // options for the google strategy
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: '/auth/google/redirect',
    },
    // passport callback function
    async function (accessToken, refreshToken, profile, done) {
      const newUser = {
        username: profile.displayName,
        googleId: profile.id,
      }
      try {
        let user = await User.findOne({ googleId: profile.id })
        if (user) {
          done(null, user)
        } else {
          user = await User.create(newUser)
          done(null, user)
        }
      } catch (err) {
        console.log(err)
      }

      // User.findOne({ googleId: profile.id }).then((currentUser) => {

      //   if (currentUser) {
      //     console.log('user already exist:' + currentUser)
      //     done(null, currentUser)
      //   } else {
      //     new User({
      //       username: profile.displayName,
      //       googleId: profile.id,
      //     })
      //       .save()
      //       .then((newUser) => {
      //         console.log('new user:' + newUser)
      //         done(null, newUser)
      //       })
      //   }
      // })
    }
  )
)
