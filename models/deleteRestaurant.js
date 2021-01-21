const express = require('express')
const router = express.Router()
const restaurant = require('./restaurant')

router.post('/:id/deleteRestaurant', (req, res) => {
  const id = req.params.id
  return restaurant.findById(id)
    .then(item => item.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
