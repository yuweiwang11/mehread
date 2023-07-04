const User = require('../models/Users')
const Bookshelf = require('../models/Bookshelf')
const Bookitem = require('../models/Bookitem')

const jwt = require('jsonwebtoken')

const router = require('express').Router()

router.post('/getbookshelves', async (req, res) => {
  // console.log(req.body.userid)
  const userId = req.body.userid
  const userData = await User.findOne({ _id: userId })
  // console.log(userData)
  if (userData) {
    const bookshelves = await Bookshelf.find({ user: userId })
    res.json(bookshelves)
    // console.log(bookshelves)
  }
})

router.post('/addToBookShelves', async (req, res) => {
  const { targetBookshelfId, bookInfoForBookitem } = req.body
  const newBookitem = await Bookitem.create({
    bookshelfId: targetBookshelfId,
    bookitem: bookInfoForBookitem,
  })
  res.json(newBookitem)
  // console.log(targetBookshelfId, bookInfo)
})
module.exports = router
