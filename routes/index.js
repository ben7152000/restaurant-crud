const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const detail = require('./modules/detail')
const search = require('./modules/search')
const controll = require('./modules/controll')

router.use('/', home)
router.use('/restaurants', controll)
router.use('/restaurants', detail)
router.use('/search', search)

module.exports = router
