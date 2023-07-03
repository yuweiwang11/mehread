const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

const User = require('../models/Users')
const Bookshelf = require('../models/Bookshelf')

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
        googleId: profile.id,
        username: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        image: profile.photos[0].value,
        email: profile.emails[0].value,
      }
      try {
        let user = await User.findOne({ googleId: profile.id })
        if (user) {
          done(null, user)
        } else {
          user = await User.create(newUser)
          done(null, user)
          const UserBookshelf = await Bookshelf.insertMany([
            { user: user._id, bookshelfName: 'reading' },
            { user: user._id, bookshelfName: 'want to read' },
            { user: user._id, bookshelfName: 'have read' },
          ])
        }
      } catch (err) {
        console.log(err)
      }
    }
  )
)
