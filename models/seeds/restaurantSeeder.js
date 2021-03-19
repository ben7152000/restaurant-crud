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
  USERS_SEEDER.forEach(async (user, index) => {
    try {
      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(user.password, salt)
      const userSeeder = await User.create({ email: user.email, password: hashPassword })
      Array.from({ length: 3 }, (v, i) => Restaurant.create({ ...restaurant[(i + (index * 3))], userId: userSeeder._id }))
      const restaurantSeeder = await Restaurant.find()
      if (restaurantSeeder.length === 3) process.exit()
    } catch (e) {
      console.log(e)
    }
  })
  console.log('Restaurant and Users seeders is done')
})
