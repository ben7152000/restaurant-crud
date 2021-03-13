// modules
const express = require('express')
const router = express.Router()

// controller
const userController = require('../controllers/userController')
const restaurantController = require('../controllers/restaurantController')
const facebookController = require('../controllers/facebookController')

// middleware
const { authenticator } = require('../middlewares/auth')

// home
router.get('/', (req, res) => res.redirect('/users/login'))

// restaurant
router.get('/restaurants', authenticator, restaurantController.getRestaurants)
router.get('/restaurants/create', authenticator, restaurantController.createRestaurantPage)
router.post('/restaurants/create', authenticator, restaurantController.createRestaurant)
router.get('/restaurants/:id/edit', authenticator, restaurantController.editRestaurantPage)
router.post('/restaurants/:id/edit', authenticator, restaurantController.editRestaurant)
router.post('/restaurants/:id/delete', authenticator, restaurantController.deleteRestaurant)
router.get('/restaurants/:id', authenticator, restaurantController.detailRestaurant)

// users
router.get('/users/login', userController.loginPage)
router.post('/users/login', userController.login)
router.get('/users/register', userController.registerPage)
router.post('/users/register', userController.register)
router.get('/users/logout', userController.logout)

// facebook
router.get('/auth/facebook', facebookController.facebookAuthenticator)
router.get('/auth/facebook/callback', facebookController.facebookCallback)

module.exports = router
