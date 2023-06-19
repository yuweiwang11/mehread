const router = require('express').Router()
const passport = require('passport')

//auth login
router.get('/login', (req, res) => {
  res.send('login')
})

//auth logout
router.get('/logout', (req, res) => {
  // handle with passport
  res.render('lougout')
})

//auth login with google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile'],
  })
  // handle with google
)

// callback route for google to redirect to
router.get('/google/redirect', (req, res) => {
  res.send('you reached callback url')
})

module.exports = router
