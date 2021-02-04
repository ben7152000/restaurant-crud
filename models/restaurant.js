const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  name_en: String,
  phone: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  google_map: {
    type: String,
    required: true
  },
  category: String,
  image: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: String
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

module.exports = Restaurant
