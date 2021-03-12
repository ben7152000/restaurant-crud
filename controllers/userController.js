const User = require('../models/user')
const bcrypt = require('bcryptjs')
const passport = require('passport')

const userController = {
  loginPage: (req, res) => {
    return res.render('../views/users/login')
  },
  login:
    passport.authenticate('local', {
      successRedirect: '/restaurants',
      failureRedirect: '/users/login'
    }),
  registerPage: (req, res) => {
    return res.render('../views/users/register')
  },
  register: (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    const errors = []
    if (!name || !email || !password || !confirmPassword) errors.push({ message: '所有欄位都是必填。' })
    if (password !== confirmPassword) errors.push({ message: '密碼與確認密碼不相符！' })
    if (errors.length) {
      return res.render('../views/users/register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    User.findOne({ email })
      .then(user => {
        if (user) {
          errors.push({ message: '這個帳號已經註冊過了。' })
          console.log('User already exists')
          return res.render('../views/users/register', {
            name,
            email,
            password,
            confirmPassword
          })
        }
        return bcrypt.genSalt(10)
          .then(salt => bcrypt.hash(password, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash
          }))
          .then(() => res.redirect('login'))
          .catch(err => console.log(err))
      })
  },
  logout: (req, res) => {
    req.logout()
    req.flash('success_msg', '你已經成功登出。')
    res.redirect('/users/login')
  }
}

module.exports = userController
