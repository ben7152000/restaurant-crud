const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')
const { check, validationResult } = require('express-validator')

// add
router.get('/addRestaurant', (req, res) => res.render('../views/restaurant/add'))

router.post('/', [
  check('name')
    .matches(/./)
    .withMessage('請輸入店家名稱'),
  check('phone')
    .trim()
    .matches(/^(\(\d{2}\)|^\d{2}\s?-?)(\d{3,4}-?\s?\d{4})$/)
    .withMessage('請輸入市話'),
  check('rating')
    .matches(/^[1-5](.\d)?$/)
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
  const restaurantItem = req.body
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render('../views/restaurant/add', {
      errorMessages: errors.array(),
      restaurantItem
    })
  }
  Restaurant.create(restaurantItem)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// edit
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
    .trim()
    .matches(/^(\(\d{2}\)|^\d{2}\s?-?)(\d{3,4}-?\s?\d{4})$/)
    .withMessage('請輸入市話'),
  check('rating')
    .matches(/^[1-5](.\d)?$/)
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

// delete
router.post('/:id/deleteRestaurant', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(item => item.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// detail
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurantItem) => res.render('../views/restaurant/detail', { restaurantItem }))
    .catch(error => console.log(error))
})

module.exports = router
