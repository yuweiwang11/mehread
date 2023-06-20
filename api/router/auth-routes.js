const router = require('express').Router()
const passport = require('passport')

const client_url = 'http://localhost:5173'

//auth login
router.get('/login', (req, res) => {
  res.send('you have logged in')
})

//auth logout
router.get('/logout', (req, res) => {
  // handle with passport
  req.logOut()
  res.redirect(client_url)
})

router.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: 'login successfull',
      user: req.user,
    })
  }
})

router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'login failure',
  })
})

//auth login with google
router.get(
  // handle with google
  '/google',
  passport.authenticate('google', {
    scope: ['profile'],
  })
)

// callback route for google to redirect to
router.get(
  '/google/redirect',
  passport.authenticate('google', {
    successRedirect: client_url,
    failureRedirect: '/login/failed',
  })
  // (req, res) => {
  //   res.redirect(client_url)
  // }
  // res.redirect('/userProfile/')
  // const userId = req.user._id
  // res.redirect('http://localhost:5173/' + userId)

  // res.writeHead(301, { Location: 'http://localhost:5173' })
  // res.end()
)

module.exports = router
