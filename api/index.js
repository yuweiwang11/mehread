const express = require('express')
const app = express()

app.get('/test', function (req, res) {
  res.send('Hello World')
})

app.listen(4000)
