const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Data modeling
const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  range: {
    type: Array,
    required: true,
  },
  tag: {
    type: String,
  },
  des: {
    type: String,
  },
})

module.exports = mongoose.model('Task', TaskSchema)
