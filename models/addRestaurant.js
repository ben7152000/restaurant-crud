const express = require('express')
const router = express.Router()
const Restaurant = require('./restaurant')

router.get('/addRestaurant', (req, res) => res.render('../views/restaurant/add'))

router.post('/', (req, res) => {
  const restaurantItem = req.body
  return Restaurant.create(restaurantItem)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
