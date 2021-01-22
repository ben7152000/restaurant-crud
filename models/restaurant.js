const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  name: String,
  name_en: String,
  phone: String,
  rating: Number,
  google_map: String,
  category: String,
  image: String,
  location: String,
  description: String
})

module.exports = mongoose.model('Restaurant', restaurantSchema)
