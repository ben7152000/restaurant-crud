const express = require('express')
const router = express.Router()

const home = require('../models/home')
const addRestaurant = require('../models/addRestaurant')
const detail = require('../models/detail')
const edit = require('../models/edit')
const deleteRestaurant = require('../models/deleteRestaurant')
const search = require('../models/search')

router.use('/', home)
router.use('/restaurants', addRestaurant)
router.use('/restaurants', detail)
router.use('/restaurants', edit)
router.use('/restaurants', deleteRestaurant)
router.use('/search', search)

module.exports = router
