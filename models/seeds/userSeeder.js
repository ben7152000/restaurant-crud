const bcrypt = require('bcryptjs')
const User = require('../user')
const user = require('./users.json').results[0]
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('The database is continue')
  bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(user.password, salt))
    .then(hash => User.create({
      name: user.name,
      email: user.email,
      password: hash
    }))
    .then(() => db.close())
  console.log('User seeders is done')
})
