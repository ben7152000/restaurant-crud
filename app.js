// define modules
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const userPassport = require('./config/passport')
const flash = require('connect-flash')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3000

// setting database
require('./config/mongoose')

// setting body-parser
app.use((bodyParser.urlencoded({ extended: false })))

// cors
app.use(cors())

// express-session
app.use(session({ secret: 'UserSecret', resave: false, saveUninitialized: true }))

// setting express-handlebars
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

// passport
userPassport(app)

// connect-flash
app.use(flash())

// check authenticate
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// setting router
require('./routes')(app)

// listen server
app.listen(PORT, () => console.log(`The server is working on the localhost:${PORT}`))
