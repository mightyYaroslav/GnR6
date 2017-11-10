const express = require('express')
const router = express.Router()

router.use('/all', require('./all'))
router.use('/add', require('./add'))
router.use('/delete', require('./delete'))

module.exports = router