const express = require('express')
const router = express.Router()
const Item = require('../../models/item')

router.get('/newItem', (req, res) => res.render('newItem'))
router.post('/', (req, res) => {
  const restaurant = req.body
  return Item.create(restaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
