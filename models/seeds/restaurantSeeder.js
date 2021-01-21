const Restaurant = require('../restaurant')
const restaurant = require('../../restaurantItem.json')

const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('The database is working')
  restaurant.forEach(restaurantItem => {
    Restaurant.create({
      id: restaurantItem.id,
      name: restaurantItem.name,
      name_en: restaurantItem.name_en,
      category: restaurantItem.category,
      image: restaurantItem.image,
      location: restaurantItem.location,
      phone: restaurantItem.phone,
      google_map: restaurantItem.google_map,
      rating: restaurantItem.rating,
      description: restaurantItem.description
    })
      .then(() => db.close())
  })
})
