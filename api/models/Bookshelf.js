const mongoose = require('mongoose')
const { Schema } = mongoose

const BookshelfSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bookshelfName: { type: String, required: true },
})

const BookshelfModel = mongoose.model('Bookshelf', BookshelfSchema)

module.exports = BookshelfModel
