if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bcrypt = require('bcryptjs')
const Restaurant = require('../restaurant')
const User = require('../user')
const restaurant = require('./restaurant.json').results
const db = require('../../config/mongoose')

const USERS_SEEDER = [
  {
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    email: 'user2@example.com',
    password: '12345678'
  }
]

db.once('open', () => {
  console.log('The database is continue')
  USERS_SEEDER.forEach((user, index) => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => User.create({
        email: user.email,
        password: hash
      }))
      .then(userData => {
        const userId = userData._id
        return Promise.all(Array.from({ length: 3 }, (_, i) => Restaurant.create({
          ...restaurant[(i + (index * 3))], userId
        })))
      })
      .then(() => db.close())
  })
  console.log('Restaurant seeders is done')
})
