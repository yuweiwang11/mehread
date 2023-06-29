const User = require('../models/Users')
const Bookshelf = require('../models/Bookshelf')

const router = require('express').Router()

router.post('/getbookshelves', async (req, res) => {
  // console.log(req.body.userid)
  const userId = req.body.userid
  const userData = await User.findOne({ _id: userId })
  // console.log(userData)
  if (userData) {
    const bookshelves = await Bookshelf.find({ user: userId })
    console.log(bookshelves)
    // res.send(bookshelves)
  }
})

module.exports = router
