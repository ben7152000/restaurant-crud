// restaurant schema
const Restaurant = require('../models/restaurant')

// restaurant control
const restaurantController = {
  getRestaurants: (req, res) => {
    return Restaurant.find()
      .lean()
      .then(restaurant => res.render('../views/restaurants/index', { restaurant }))
      .catch(error => {
        console.error(error)
        res.render('../views/error/index')
      })
  },
  createRestaurantPage: (req, res) => {
    res.render('../views/restaurants/create')
  },
  createRestaurant: async (req, res) => {
    const restaurantItem = req.body
    await Restaurant.create(restaurantItem)
      .then(() => res.redirect('/restaurants'))
      .catch(error => console.log(error))
  },
  editRestaurantPage: async (req, res) => {
    const id = req.params.id
    await Restaurant.findById(id)
      .lean()
      .then(restaurantItem => res.render('../views/restaurants/edit', { restaurantItem }))
      .catch(error => console.log(error))
  },
  editRestaurant: async (req, res) => {
    const id = req.params.id
    await Restaurant.findById(id)
      .then(restaurantItem => {
        restaurantItem = Object.assign(restaurantItem, req.body)
        return restaurantItem.save()
      })
      .then(() => res.redirect(`/restaurants/${id}`))
      .catch(error => console.log(error))
  },
  deleteRestaurant: async (req, res) => {
    const id = req.params.id
    await Restaurant.findOne(id)
      .then(item => item.remove())
      .then(() => res.redirect('/restaurants'))
      .catch(error => console.log(error))
  },
  detailRestaurant: async (req, res) => {
    const id = req.params.id
    await Restaurant.findById(id)
      .lean()
      .then((restaurantItem) => res.render('../views/restaurants/detail', { restaurantItem }))
      .catch(error => console.log(error))
  }
}

module.exports = restaurantController
