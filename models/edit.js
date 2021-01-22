const express = require('express')
const router = express.Router()
const Restaurant = require('./restaurant')
const { check, validationResult } = require('express-validator')

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurantItem) => res.render('../views/restaurant/edit', { restaurantItem }))
    .catch(error => console.log(error))
})

router.post('/:id/edit', [
  check('name')
    .matches(/./)
    .withMessage('請輸入店家名稱'),
  check('phone')
    .matches(/\d/)
    .withMessage('請輸入電話號碼 8 ~ 10 碼'),
  check('rating')
    .matches(/[0-5]/)
    .withMessage('請給予 1.0 ~ 5.0 評價')
], (req, res) => {
  const id = req.params.id
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).render('../views/restaurant/add', {
      errorMessages: errors.array()
    })
  }
  return Restaurant.findById(id)
    .then(restaurantItem => {
      restaurantItem.name = req.body.name
      restaurantItem.name_en = req.body.name_en
      restaurantItem.category = req.body.category
      restaurantItem.image = req.body.image
      restaurantItem.location = req.body.location
      restaurantItem.phone = req.body.phone
      restaurantItem.google_map = req.body.google_map
      restaurantItem.rating = req.body.rating
      restaurantItem.description = req.body.description
      return restaurantItem.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

module.exports = router
