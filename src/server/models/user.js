const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

// Data modeling
const User = new Schema({
  username: String,
  password: String,
  salt: String,
  hash: String,
  acountname: String,
  imageurl: String,
})

User.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', User)
