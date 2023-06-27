const mongoose = require('mongoose')
const { Schema } = mongoose

const Bookshelf = new Schema([
  {
    createdAt: {
      type: Date,
      default: Date.now,
    },
    bookshelfName: { type: String, required: true },
    bookItems: [{ type: Object, required: false }],
  },
  // {
  //   createdAt: {
  //     type: Date,
  //     default: Date.now,
  //   },
  //   bookshelfName: 'Want to read',
  //   bookItems: [{ type: Object, required: false }],
  // },
  // {
  //   createdAt: {
  //     type: Date,
  //     default: Date.now,
  //   },
  //   bookshelfName: 'Reading',
  //   bookItems: [{ type: Object, required: false }],
  // },
  // {
  //   createdAt: {
  //     type: Date,
  //     default: Date.now,
  //   },
  //   bookshelfName: 'Have read',
  //   bookItems: [{ type: Object, required: false }],
  // },
])

const LibrarySchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bookshelf: Bookshelf,
})

const LibraryModel = mongoose.model('Library', LibrarySchema)

module.exports = LibraryModel
