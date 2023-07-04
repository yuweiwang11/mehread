const mongoose = require('mongoose')
const { Schema } = mongoose

const BookitemSchema = new Schema({
  bookshelfId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Bookshelf' },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bookitem: { type: Object, required: true },
  comment: { type: String },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
})

const BookitemModel = mongoose.model('Bookitem', BookitemSchema)

module.exports = BookitemModel
