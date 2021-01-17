// 取模組
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const router = require('./routes/index')
const app = express()

const post = 3000

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
})

// 渲染引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定路由
app.use(express.static('public'))
app.use(router)

// 伺服器監聽
app.listen(post)
