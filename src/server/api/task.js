const express = require('express')
const Task = require('../models/task')
const router = express.Router()
747
// router.get('/login', (req, res, next) => {
//   res.cookie('sessionId', 'Luo', { httpOnly: true }).status(200).redirect(301, '/').end()
// })

router.post('/planner', function (req, res) {
  console.log('planner', req.body)
})

router.get('/*', (req, res, next) => {
  res.send(403)
})

module.exports = router
