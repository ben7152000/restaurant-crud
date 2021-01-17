const express = require('express')
const router = express.Router()

const home = require('../routes/modules/home')
const newItem = require('../routes/modules/newItem')
const detail = require('../routes/modules/detail')
const edit = require('../routes/modules/edit')

router.use('/', home)
router.use('/items', newItem)
router.use('/items', detail)
router.use('/items', edit)

module.exports = router
