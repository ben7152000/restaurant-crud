const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const search = require('./modules/search')
const control = require('./modules/control')

router.use('/', home)
router.use('/restaurants', control)
router.use('/search', search)

module.exports = router
