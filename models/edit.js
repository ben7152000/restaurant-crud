const express = require('express')
const router = express.Router()
const Restaurant = require('./restaurant')

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurantItem) => res.render('../views/restaurant/edit', { restaurantItem }))
    .catch(error => console.log(error))
})

router.post('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurantItem => {
      restaurantItem.name = req.body.name
      restaurantItem.name_en = req.body.name_en
      restaurantItem.category = req.body.category
      restaurantItem.image = req.body.image
      restaurantItem.location = req.body.location
      restaurantItem.phone = req.body.phone
      restaurantItem.google_map = req.body.google_map
      restaurantItem.rating = req.body.rating
      restaurantItem.description = req.body.description
      return restaurantItem.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

module.exports = router
