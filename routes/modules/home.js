const express = require('express')
const router = express.Router()
const Item = require('../../models/item')

router.get('/', (req, res) => {
  Item.find()
    .lean()
    .then(item => res.render('index', { item }))
    .catch(error => console.error(error))
})

module.exports = router
