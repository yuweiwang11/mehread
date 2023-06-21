const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
  googleId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
