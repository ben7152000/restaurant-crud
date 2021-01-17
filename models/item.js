const mongoose = require('mongoose')
const Schema = mongoose.Schema
const itemSchema = new Schema({
  name: String,
  name_en: String,
  category: String,
  image: String,
  location: String,
  phone: String,
  google_map: String,
  rating: String,
  description: String
})
module.exports = mongoose.model('Item', itemSchema)
