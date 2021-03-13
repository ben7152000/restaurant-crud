// modules
const express = require('express')
const router = express.Router()

// controller
const userController = require('../controllers/userController')
const restaurantController = require('../controllers/restaurantController')
const facebookController = require('../controllers/facebookController')

// middleware
const { checkAuthenticator, checkNotAuthenticated } = require('../middlewares/auth')

// home
router.get('/', (req, res) => res.redirect('/users/login'))

// restaurant
router.get('/restaurants', checkAuthenticator, restaurantController.getRestaurants)
router.get('/restaurants/create', checkAuthenticator, restaurantController.createRestaurantPage)
router.post('/restaurants/create', checkAuthenticator, restaurantController.createRestaurant)
router.get('/restaurants/:id/edit', checkAuthenticator, restaurantController.editRestaurantPage)
router.post('/restaurants/:id/edit', checkAuthenticator, restaurantController.editRestaurant)
router.post('/restaurants/:id/delete', checkAuthenticator, restaurantController.deleteRestaurant)
router.get('/restaurants/:id', checkAuthenticator, restaurantController.detailRestaurant)

// users
router.get('/users/login', checkNotAuthenticated, userController.loginPage)
router.post('/users/login', checkNotAuthenticated, userController.login)
router.get('/users/register', checkNotAuthenticated, userController.registerPage)
router.post('/users/register', checkNotAuthenticated, userController.register)
router.get('/users/logout', userController.logout)

// facebook
router.get('/auth/facebook', checkNotAuthenticated, facebookController.facebookAuthenticator)
router.get('/auth/facebook/callback', checkNotAuthenticated, facebookController.facebookCallback)

module.exports = router
