const Restaurant = require('../restaurant')
const restaurant = require('./restaurant.json')
const db = require('../../config/mongoose')

db.once('open', () => {
  restaurant.results.forEach(restaurant => Restaurant.create(restaurant))
})
