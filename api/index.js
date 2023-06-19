const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
User = require('./models/Users.js')
require('./config/passport-setup')
const authRoutes = require('./router/auth-routes')
const passport = require('passport')

app.use(express.json())

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
)

mongoose.connect(process.env.MONGOOSE_URL)
//set up auth routes
app.use('/auth', authRoutes)

app.post('/bookSearch', (req, res) => {
  const { searchKeyword } = req.body
  res.json({ searchKeyword })
})

app.listen(4000)
