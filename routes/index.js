const express = require('express')
const router = express.Router()

const home = require('../routes/modules/home')
const newItem = require('../routes/modules/newItem')
const detail = require('../routes/modules/detail')

router.use('/', home)
router.use('/items', newItem)
router.use('/items', detail)

module.exports = router
