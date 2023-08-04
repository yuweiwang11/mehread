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
  }
})

router.put('/addToBookShelves', async (req, res) => {
  const { targetBookshelfId, bookInfoForBookitem, userid } = req.body
  const newBookitem = await Bookitem.create({
    bookshelfId: targetBookshelfId,
    userId: userid,
    bookitem: bookInfoForBookitem,
  })
  res.json(newBookitem)
})

router.post('/checkBookSaved', async (req, res) => {
  const { userid } = req.body
  const getUerBooks = await Bookitem.find({ userId: userid })
  res.json(getUerBooks)
})

router.post('/getBookshelfBooks', async (req, res) => {
  const { targetBookshelfId } = req.body
  const getBooksFromBookshelf = await Bookitem.find({ bookshelfId: targetBookshelfId })
  res.json(getBooksFromBookshelf)
})

router.post('/getUserSingleBook', async (req, res) => {
  const { userbookid } = req.body
  const getUserSingleBook = await Bookitem.findById(userbookid)
  res.json(getUserSingleBook)
})

router.post('/getBookshelfName', async (req, res) => {
  const { bookshelfid } = req.body
  const getBookshelf = await Bookshelf.findById(bookshelfid)
  res.json(getBookshelf)
})

router.put('/rateBook', async (req, res) => {
  const { userbookid, rating } = req.body
  const book = await Bookitem.findById(userbookid)
  if (book) {
    book.set({ rating: rating })
    await book.save()
  }
})

router.post('/deleteBook', async (req, res) => {
  const { userbookid } = req.body
  const book = await Bookitem.deleteOne({ _id: userbookid })
  res.json(book)
})

router.put('/moveBook', async (req, res) => {
  const { bookshelfIdToMove, userbookid } = req.body
  const book = await Bookitem.findById(userbookid)
  if (book) {
    book.set({ bookshelfId: bookshelfIdToMove })
    await book.save()
  }
})

router.post('/addComment', async (req, res) => {
  const { addBookComment, bookid } = req.body
  Bookitem.findOneAndUpdate({ _id: bookid }, { $push: { comment: addBookComment } })
    .then((result) => {
      res.json(result)
    })
    .catch((error) => {
      console.log(error)
    })
})
module.exports = router
