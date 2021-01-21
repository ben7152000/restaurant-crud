const Restaurant = require('../restaurant')
const restaurant = require('./restaurant.json')
const db = require('../../config/mongoose')

db.once('open', () => {
  for (let i = 0; i < restaurant.results.length; i++) {
    Restaurant.create(restaurant.results[i])
  }
})
