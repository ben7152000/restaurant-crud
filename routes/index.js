const express = require('express')
const router = express.Router()

const home = require('../routes/modules/home')
const newItem = require('../routes/modules/newItem')
const detail = require('../routes/modules/detail')
const edit = require('../routes/modules/edit')
const deleteItem = require('../routes/modules/deleteItem')

router.use('/', home)
router.use('/items', newItem)
router.use('/items', detail)
router.use('/items', edit)
router.use('/items', deleteItem)

module.exports = router
