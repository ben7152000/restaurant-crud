const express = require('express')
const router = express.Router()
const Restaurant = require('./restaurant')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurant => res.render('../views/restaurant/index', { restaurant }))
    .catch(error => console.error(error))
})

module.exports = router
