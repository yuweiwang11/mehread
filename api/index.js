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
  const { searchKeyword } = req.body
  res.json({ searchKeyword })
})

app.listen(4000)
