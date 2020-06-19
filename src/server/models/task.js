const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Data modeling
const Task = new Schema({
  title: String,
  location: String,
  start: String,
  end: String,
  tag: String,
  des: String,
})

module.exports = mongoose.model('Task', Task)
