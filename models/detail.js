const express = require('express')
const router = express.Router()
const restaurant = require('./restaurant')

router.get('/:id', (req, res) => {
  const id = req.params.id
  return restaurant.findById(id)
    .lean()
    .then((restaurantItem) => res.render('detail', { restaurantItem }))
    .catch(error => console.log(error))
})

module.exports = router
