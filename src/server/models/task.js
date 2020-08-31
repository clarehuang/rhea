const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Data modeling
const TaskSchema = new Schema({
  // userId: {
  //   type: String,
  //   required: true,
  // },
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
  startDate: {
    type: String,
    required: false,
  },
  tag: {
    type: String,
  },
  des: {
    type: String,
    required: false,
  },
  status: {
    type: String,
  },
})

module.exports = mongoose.model('Task', TaskSchema)
