const Restaurant = require('../models/restaurant')

const restaurantController = {
  getRestaurants: (req, res) => {
    Restaurant.find()
      .lean()
      .then(restaurant => res.render('../views/restaurants/index', { restaurant }))
      .catch(err => console.error(err))
  },
  createRestaurantPage: (req, res) => {
    res.render('../views/restaurants/create')
  },
  createRestaurant: (req, res) => {
    const restaurantItem = req.body
    Restaurant.create(restaurantItem)
      .then(() => res.redirect('/restaurants'))
      .catch(error => console.log(error))
  },
  editRestaurantPage: (req, res) => {
    const id = req.params.id
    console.log(id)
    return Restaurant.findById(id)
      .lean()
      .then((restaurantItem) => res.render('../views/restaurants/edit', { restaurantItem }))
      .catch(error => console.log(error))
  },
  editRestaurant: (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
      .then(restaurantItem => {
        restaurantItem = Object.assign(restaurantItem, req.body)
        return restaurantItem.save()
      })
      .then(() => res.redirect(`/restaurants/${id}`))
      .catch(error => console.log(error))
  },
  deleteRestaurant: (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
      .then(item => item.remove())
      .then(() => res.redirect('/restaurants'))
      .catch(error => console.log(error))
  },
  detailRestaurant: (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
      .lean()
      .then((restaurantItem) => res.render('../views/restaurants/detail', { restaurantItem }))
      .catch(error => console.log(error))
  },
  searchRestaurant: (req, res) => {
    const keyword = req.query.keyword
    return Restaurant.find({
      $or: [
        { name: { $regex: `${keyword}`, $options: '$i' } },
        { category: { $regex: `${keyword}`, $options: '$i' } }
      ]
    })
      .lean()
      .then(restaurant => res.render('../views/restaurants/index', { restaurant, keyword }))
  },
  sortRestaurant: (req, res) => {
    const sort = req.body.sort
    const order = req.body.order
    Restaurant.find()
      .lean()
      .sort({ [sort]: order })
      .then(restaurant => res.render('../views/restaurants/index', { restaurant }))
      .catch(error => console.error(error))
  }
}

module.exports = restaurantController
