const router = require('express').Router()
const passport = require('passport')
const User = require('../models/Users')
const { registerValidation, loginValidation } = require('../validation')
const bcript = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const { authenticateToken } = require('../verifyToken')
const { application } = require('express')
const client_url = 'http://localhost:5173'

//auth login
// router.get('/login', (req, res) => {
//   res.send('you have logged in')
// })

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
    res.send('user id ' + user._id)
    // res.json(usesr)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.post('/login', async (req, res) => {
  // validate user info using Joi
  const validation = loginValidation(req.body)
  if (validation.error) return res.status(400).send(validation.error.details[0].message)

  // check if email already exists
  const userExist = await User.findOne({ email: req.body.email })
  if (!userExist) return res.status(400).send('Email/User not found')

  // check password
  const validPassword = await bcript.compare(req.body.password, userExist.password)
  if (!validPassword) return res.status(400).send('Invalid Password')

  // create and assign a token jwt
  const jwtToken = jwt.sign(
    { id: userExist._id, username: userExist.username, email: userExist.email },
    process.env.TOKEN_SECRET,
    { expiresIn: '2h' }
  )
  res
    .cookie('auth-token', jwtToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
    .json({ success: true, message: 'authentication successful', token: jwtToken })
})

router.get('/profile', authenticateToken, (req, res) => {
  res.json('user profile ')
})

module.exports = router
