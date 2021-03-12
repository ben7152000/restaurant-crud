// modules
const express = require('express')
const router = express.Router()

// controller
const userController = require('../controllers/userController')
const restaurantController = require('../controllers/restaurantController')

// middleware
const { authenticator } = require('../middlewares/auth')

// home
router.get('/', (req, res) => res.redirect('/users/login'))

// restaurant
router.get('/restaurants', authenticator, restaurantController.getRestaurants)
router.post('/restaurants', authenticator, restaurantController.sortRestaurant)
router.get('/restaurants/create', authenticator, restaurantController.createRestaurantPage)
router.post('/restaurants/create', authenticator, restaurantController.createRestaurant)
router.get('/restaurants/:id/edit', authenticator, restaurantController.editRestaurantPage)
router.post('/restaurants/:id/edit', authenticator, restaurantController.editRestaurant)
router.post('/restaurants/:id/delete', authenticator, restaurantController.deleteRestaurant)
router.get('/restaurants/:id', authenticator, restaurantController.detailRestaurant)
router.get('/restaurants/search', authenticator, restaurantController.searchRestaurant)

// users
router.get('/users/login', userController.loginPage)
router.post('/users/login', userController.login)
router.get('/users/register', userController.registerPage)
router.post('/users/register', userController.register)
router.get('/users/logout', userController.logout)

module.exports = router
