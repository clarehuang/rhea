const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

// Data modeling
const User = new Schema({
  username: String,
  password: String,
})

User.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', User)
