const mongoose = require('mongoose')
const Item = require('../item')
const ItemList = require('../seeds/restaurant.json')

// 連接資料庫
mongoose.connect('mongodb://localhost/restaurant-crud', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => console.log('The database is not working'))
db.once('open', () => {
  console.log('The database is working')
  for (let i = 0; i < ItemList.results.length; i++) {
    Item.create(ItemList.results[i])
  }
})
