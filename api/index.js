const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
)

app.post('/bookSearch', (req, res) => {
  const { searchKeyWord } = req.body
  res.json({ searchKeyWord })
})

app.listen(4000)
