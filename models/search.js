const express = require('express')
const router = express.Router()
const restaurant = require('./restaurant')

router.get('/', (req, res) => {
  const keyword = req.query.keyword
  return restaurant.find({
    $or: [
      { name: { $regex: `${keyword}`, $options: '$i' } },
      { category: { $regex: `${keyword}`, $options: '$i' } }
    ]
  })
    .lean()
    .then(rest => res.render('index', { rest, keyword }))
})

module.exports = router
