const express = require('express')
const Task = require('../models/task')
const router = express.Router()

router.post('/planner', function (req, res) {
  const task = new Task(req.body)
  task.save(function (err) {
    if (err) {
      console.log(err)
    }
    // saved!
  })
})

router.get('/*', (req, res, next) => {
  res.send(403)
})

module.exports = router
