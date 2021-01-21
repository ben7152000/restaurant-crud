const express = require('express')
const router = express.Router()

const home = require('../routes/modules/home')
const newItem = require('../routes/modules/newItem')
const detail = require('../routes/modules/detail')
const edit = require('../routes/modules/edit')
const deleteItem = require('../routes/modules/deleteItem')
const search = require('../routes/modules/search')

router.use('/', home)
router.use('/items', newItem)
router.use('/items', detail)
router.use('/items', edit)
router.use('/items', deleteItem)
router.use('/search', search)

module.exports = router
