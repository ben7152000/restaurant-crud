const express = require('express')
const router = express.Router()
const Restaurant = require('./restaurant')
const { check, validationResult } = require('express-validator')

router.get('/addRestaurant', (req, res) => res.render('../views/restaurant/add'))

router.post('/', [
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
  const restaurantItem = req.body
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).render('../views/restaurant/add', {
      errorMessages: errors.array()
    })
  }
  Restaurant.create(restaurantItem)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
