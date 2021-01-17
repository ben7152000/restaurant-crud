const express = require('express')
const router = express.Router()

const home = require('../routes/modules/home')
const newItem = require('../routes/modules/newItem')

router.use('/', home)
router.use('/items', newItem)

module.exports = router
