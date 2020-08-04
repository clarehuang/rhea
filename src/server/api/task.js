const express = require('express')
const Task = require('../models/task')
const router = express.Router()

router.post('/', function (req, res) {
  const task = new Task(req.body)
  console.log(task)
  task.save(function (err) {
    if (err) {
      console.log(err)
    }
    // saved!
  })
})

router.get('/', (req, res, next) => {
  Task.find().exec((err, data) => {
    if (err) {
      return res.status(400).send(data).end()
    }
    res.status(200).send(data).end()
  })
})

module.exports = router
