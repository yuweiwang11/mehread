const router = require('express').Router()
const passport = require('passport')
const User = require('../models/Users')
const { registerValidation } = require('../validation')
const bcript = require('bcryptjs')

const client_url = 'http://localhost:5173'

//auth login
router.get('/login', (req, res) => {
  res.send('you have logged in')
})

//auth logout
router.get('/logout', (req, res, next) => {
  // handle with passport
  req.logOut((err) => {
    if (err) {
      return next(err)
    }
    res.redirect(client_url)
  })
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
    scope: ['profile', 'email'],
  })
)

// callback route for google to redirect to
router.get(
  '/google/redirect',
  passport.authenticate('google', {
    successRedirect: client_url,
    failureRedirect: '/login/failed',
  })
)

// register with password using jwt
router.post('/register', async (req, res) => {
  // validate user info using Joi
  const validation = registerValidation(req.body)
  if (validation.error) return res.status(400).send(validation.error.details[0].message)

  // check user already exists
  const emailExist = await User.findOne({ email: req.body.email })
  if (emailExist) return res.status(400).send('Email already exists')

  // hash password
  // generate salt and hash password with salt
  const salt = await bcript.genSaltSync(10)
  const hashedPassword = await bcript.hashSync(req.body.password, salt)
  // create new user
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  })
  try {
    const savedUser = await user.save()
    res.send(savedUser)
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = router
