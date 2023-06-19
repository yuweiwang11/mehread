const router = require('express').Router()

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
router.get('/google', (req, res) => {
  // handle with google
  res.send('login with google')
})

module.exports = router
