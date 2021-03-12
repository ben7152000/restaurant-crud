const Restaurant = require('../restaurant')
const restaurant = require('./restaurant.json').results
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('The database is continue')
  Restaurant.create(restaurant)
    .then(() => db.close())
  console.log('Restaurant seeders is done')
})
