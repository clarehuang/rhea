const express = require('express')
const moment = require('moment')
const Task = require('../models/task')
const router = express.Router()

//////////////////// Utils ////////////////////////
function pareZoneFormat(date, format) {
  // @date : string
  // @format: string
  return moment.parseZone(date).local().format(format)
}

//////////////////// REST API ////////////////////////
router.post('/', function (req, res) {
  const task = new Task(req.body)
  task.save(function (err, data) {
    if (err) {
      console.log(err)
    }
    res.status(200).send(data).end()
  })
})

router.get('/', (req, res, next) => {
  Task.find({ startDate: req.query.pickedDate }).exec((err, data) => {
    if (err) {
      return res.status(400).send(data).end()
    }
    res.status(200).send(data).end()
  })
})
//CHECK
router.patch('/', (req, res, next) => {
  Task.updateOne({ _id: req.body._id }, req.body, (err, data) => {
    if (err) {
      return res.status(400).send(data).end()
    }
    res.status(200).send(data).end()
  })
})

router.delete('/', (req, res, next) => {
  Task.deleteOne({ _id: req.body._id }, (err, data) => {
    if (err) {
      return res.status(400).send(data).end()
    }
    res.status(200).send(data).end()
  })
})

router.get('/calendar', (req, res, next) => {
  Task.find({ startDate: { $regex: req.query.pickedMonth, $options: 'i' } }).exec((err, data) => {
    if (err) {
      return res.status(400).send(data).end()
    }
    res.status(200).send(data).end()
  })
})

module.exports = router
