const express = require('express')
const router = express.Router()
const Item = require('../../models/item')

router.post('/:id/deleteItem', (req, res) => {
  const id = req.params.id
  return Item.findById(id)
    .then(item => item.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
