const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/restaurant-crud', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => console.log('The database is not working'))

db.once('open', () => {
  console.log('The database is working')
})

module.exports = db
