const router = require('express').Router()
const passport = require('passport')

//auth login
router.get('/login', (req, res) => {
  res.send('you have logged in')
})

//auth logout
router.get('/logout', (req, res) => {
  // handle with passport
  res.send('you are logged out')
})

//auth login with google
router.get(
  // handle with google
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
)

// callback route for google to redirect to
router.get('/google/redirect', (req, res) => {
  res.send('you reached callback url')
})

module.exports = router
