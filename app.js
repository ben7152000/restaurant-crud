// define modules
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

// setting body-parser
app.use((bodyParser.urlencoded({ extended: true })))

// setting express-handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

// setting router
app.use(router)

// listen server
app.listen(post, () => console.log(`The server is working on the localhost:${post}`))
