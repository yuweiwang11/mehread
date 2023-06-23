const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
  googleId: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
