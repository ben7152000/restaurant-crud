const mongoose = require('mongoose')
const Item = require('../item')

// 連接資料庫
mongoose.connect('mongodb://localhost/restaurant-crud', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

// 註冊事件監聽
db.on('error', () => {
  console.log('error')
})

// 檢測連線是否成功
db.once('open', () => {
  console.log('open')
  for (let i = 0; i < 10; i++) {
    Item.create({ name: 'name-' + i })
  }
  console.log('done')
})
