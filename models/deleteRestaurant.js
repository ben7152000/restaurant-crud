const express = require('express')
const router = express.Router()
const Restaurant = require('./restaurant')

router.post('/:id/deleteRestaurant', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(item => item.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
