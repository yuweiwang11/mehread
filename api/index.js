const express = require('express')
const cors = require('cors')
const app = express()
require('./config/passport-setup')
const authRoutes = require('./router/auth-routes')

app.use(express.json())

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
)

//set up auth routes
app.use('/auth', authRoutes)

app.post('/bookSearch', (req, res) => {
  const { searchKeyword } = req.body
  res.json({ searchKeyword })
})

app.listen(4000)
