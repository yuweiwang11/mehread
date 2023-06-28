const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const User = require('./models/Users.js')
const Library = require('./models/Library.js')
require('./config/passport-setup')
const authRoutes = require('./router/auth-routes')
const passport = require('passport')
const cookieSession = require('cookie-session')
const session = require('express-session')
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser())

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
)

app.use(
  session({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 6 * 60 * 60 * 1000 },
  })
)

// app.use(
//   cookieSession({
//     maxAge: 12 * 60 * 60 * 1000,
//     keys: [process.env.COOKIE_KEY],
//   })
// )

//initialize passport
app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(process.env.MONGOOSE_URL)

//set up auth routes
app.use('/auth', authRoutes)

app.post('/bookSearch', (req, res) => {
  const { searchKeyword } = req.body
  res.json({ searchKeyword })
})

const newLib = new Library({
  user: 'mimi',
  bookshelfName: 'want to read',
})
console.log(newLib)

app.listen(4000)
