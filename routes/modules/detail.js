const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurantItem) => res.render('../views/restaurant/detail', { restaurantItem }))
    .catch(error => console.log(error))
})

module.exports = router
