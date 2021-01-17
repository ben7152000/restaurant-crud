const express = require('express')
const router = express.Router()
const Item = require('../../models/item')

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Item.findById(id)
    .lean()
    .then((item) => res.render('edit', { item }))
    .catch(error => console.log(error))
})

router.post('/:id/edit', (req, res) => {
  const id = req.params.id
  return Item.findById(id)
    .then(item => {
      item.name = req.body.name
      item.name_en = req.body.name_en
      item.category = req.body.category
      item.image = req.body.image
      item.location = req.body.location
      item.phone = req.body.phone
      item.google_map = req.body.google_map
      item.rating = req.body.rating
      item.description = req.body.description
      return item.save()
    })
    .then(() => res.redirect(`/items/${id}`))
    .catch(error => console.log(error))
})

module.exports = router
