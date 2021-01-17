// 取模組
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const router = require('./routes/index')
const bodyParser = require('body-parser')
const app = express()
const post = 3000

// connect database
mongoose.connect('mongodb://localhost/restaurant-crud', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => console.log('The database is not working'))
db.once('open', () => console.log('The database is working'))

// 設定 body-parser
app.use((bodyParser.urlencoded({ extended: true })))

// 設定 express-handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

// 設定 router
app.use(router)

// listen server
app.listen(post, () => console.log(`The server is working on the localhost:${post}`))
