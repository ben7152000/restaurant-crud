const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  name: { type: String, required: true },
  name_en: { type: String, lowercase: true, trim: true },
  category: { type: String, default: '未分類' },
  image: { type: String, default: 'http://lorempixel.com/400/200/food/' },
  location: String,
  phone: { type: String, match: /[0-9]/ },
  google_map: String,
  rating: { type: Number, min: 1, max: 5, default: 3.0 },
  description: { type: String, default: '非常美味' }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)
