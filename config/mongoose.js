const { connect, connection } = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/restaurant-crud'
connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = connection

db.on('error', () => console.log('The database is not working'))
db.once('open', () => console.log('The database is working'))

module.exports = db
