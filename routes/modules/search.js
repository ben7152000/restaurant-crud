const express = require('express')
const router = express.Router()
const Item = require('../../models/item')

router.get('/', (req, res) => {
  const keyword = req.query.keyword
  return Item.find({
    $or: [
      { name: { $regex: `${keyword}`, $options: '$i' } },
      { category: { $regex: `${keyword}`, $options: '$i' } }
    ]
  })
    .lean()
    .then(rest => res.render('index', { rest, keyword }))
})

module.exports = router
