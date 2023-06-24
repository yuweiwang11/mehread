const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
  const jwtToken = req.cookies['auth-token']
  if (!jwtToken) return res.status(401).json({ error: 'Access Denied, user not authenticated' })

  try {
    const validToken = jwt.verify(jwtToken, process.env.TOKEN_SECRET)
    if (validToken) {
      req.authenticated = true
      next()
    }
  } catch (err) {
    res.status(400).json({ error: err })
  }
}

module.exports = { authenticateToken }
