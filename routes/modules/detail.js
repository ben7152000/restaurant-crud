const express = require('express')
const router = express.Router()
const Item = require('../../models/item')

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Item.findById(id)
    .lean()
    .then((item) => res.render('detail', { item }))
    .catch(error => console.log(error))
})

module.exports = router
