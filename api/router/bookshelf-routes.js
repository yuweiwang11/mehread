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
  const { targetBookshelfId, bookInfoForBookitem, userid } = req.body
  const newBookitem = await Bookitem.create({
    bookshelfId: targetBookshelfId,
    userId: userid,
    bookitem: bookInfoForBookitem,
  })
  res.json(newBookitem)
})

router.get('/checkBookSaved', async (req, res) => {
  const { userid } = req.body
  const getUerBooks = await Bookitem.find({ user: userid })
  res.json(getUerBooks)
})

router.post('/getBookshelfBooks', async (req, res) => {
  const { targetBookshelfId } = req.body
  const getBooksFromBookshelf = await Bookitem.find({ bookshelfId: targetBookshelfId })
  res.json(getBooksFromBookshelf)
})

router.post('/getUserSingleBook', async (req, res) => {
  const { userbookid } = req.body
  const getUserSingleBook = await Bookitem.findOne({ _id: userbookid })
  res.json(getUserSingleBook)
})
module.exports = router
