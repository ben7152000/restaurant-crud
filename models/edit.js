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
    .matches(/^\d{8,10}$/)
    .withMessage('請輸入電話號碼 8 ~ 10 碼'),
  check('rating')
    .matches(/^[1-5]{1}/)
    .withMessage('請給予 1.0 ~ 5.0 評價'),
  check('image')
    .matches(/http.+/)
    .withMessage("請給予 '圖片' 正確連結"),
  check('google_map')
    .matches(/http.+/)
    .withMessage("請給予 '地圖' 正確連結"),
  check('location')
    .matches(/[\u4e00-\u9fa5]/)
    .withMessage('請輸入地址')
], (req, res) => {
  const id = req.params.id
  const restaurantItem = req.body
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    restaurantItem._id = id
    return res.render('../views/restaurant/edit', {
      errorMessages: errors.array(),
      restaurantItem
    })
  }

  return Restaurant.findById(id)
    .then(restaurantItem => {
      restaurantItem = Object.assign(restaurantItem, req.body)
      return restaurantItem.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

module.exports = router
