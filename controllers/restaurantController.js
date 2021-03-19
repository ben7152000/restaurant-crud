// restaurant schema
const Restaurant = require('../models/restaurant')

// restaurant control
const restaurantController = {

  // 取得所有餐廳
  getRestaurants: async (req, res) => {
    const userId = req.user._id
    try {
      const restaurant = await Restaurant.find({ userId }).lean()
      res.render('../views/restaurants/index', { restaurant })
    } catch (e) {
      console.log(e)
      res.render('../views/error/index')
    }
  },

  // 建立餐廳頁面
  createRestaurantPage: (req, res) => {
    res.render('../views/restaurants/create')
  },

  // 建立餐廳資料
  createRestaurant: async (req, res) => {
    const userId = req.user._id
    // eslint-disable-next-line camelcase
    const { name, name_en, phone, rating, google_map, category, image, location, description } = req.body
    try {
      await Restaurant.create({ name, name_en, phone, rating, google_map, category, image, location, description, userId })
      res.redirect('/restaurants')
    } catch (e) {
      console.log(e)
      res.render('../views/error/index')
    }
  },

  // 編輯餐廳頁面
  editRestaurantPage: async (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    try {
      const restaurant = await Restaurant.findOne({ userId, _id }).lean()
      res.render('../views/restaurants/edit', { restaurant })
    } catch (e) {
      console.log(e)
      res.render('../views/error/index')
    }
  },

  // 編輯餐廳資料
  editRestaurant: async (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    try {
      const restaurant = await Restaurant.findOne({ userId, _id })
      // eslint-disable-next-line camelcase
      const { name, name_en, phone, rating, google_map, category, image, location, description } = req.body
      restaurant.name = name
      // eslint-disable-next-line camelcase
      restaurant.name_en = name_en
      restaurant.phone = phone
      restaurant.rating = rating
      // eslint-disable-next-line camelcase
      restaurant.google_map = google_map
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.description = description
      restaurant.save()
      res.redirect(`/restaurants/${_id}`)
    } catch (e) {
      console.log(e)
      res.render('../views/error/index')
    }
  },

  // 刪除餐廳
  deleteRestaurant: async (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    try {
      const restaurant = await Restaurant.findOne({ userId, _id })
      restaurant.remove()
      res.redirect('/restaurants')
    } catch (e) {
      console.log(e)
      res.render('../views/error/index')
    }
  },

  // 詳細餐廳頁面
  detailRestaurant: async (req, res) => {
    const userId = req.user._id
    const _id = req.params.id
    try {
      const restaurant = await Restaurant.findOne({ userId, _id }).lean()
      res.render('../views/restaurants/detail', { restaurant })
    } catch (e) {
      console.log(e)
      res.render('../views/error/index')
    }
  }
}

module.exports = restaurantController
