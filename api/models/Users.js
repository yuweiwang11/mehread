const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
  username: String,
  googleId: String,
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
