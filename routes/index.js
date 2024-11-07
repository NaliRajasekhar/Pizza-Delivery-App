// routes/index.js
const express = require('express');
const router = express.Router();
const { authenticate }= require('../utils/authenticate');

// Import controllers
const userController = require('../controllers/userController');
const authController = require('../controllers/authController.js');
const menuController = require('../controllers/menuController');
const cartController = require('../controllers/cartController');
const orderController = require('../controllers/orderController');

// User routes
router.post('/users/signup', userController.signup);          // User signup
router.post('/users/login', authController.login);            // User login
router.put('/users/:id',authenticate, userController.updateUser); // Update user info (requires authentication)
router.delete('/users/:id', userController.deleteUser); // Delete user (requires authentication)

// Menu routes
router.get('/menu', authenticate, menuController.getMenuItems); // Get menu items (requires authentication)

// Cart routes
router.post('/cart', authenticate, cartController.addToCart);   // Add item to cart (requires authentication)
router.get('/cart', authenticate, cartController.viewCart);     // View cart (requires authentication)
router.delete('/cart/:itemId', authenticate, cartController.removeFromCart); // Remove item from cart

// Order routes
router.post('/orders', authenticate, orderController.createOrder); // Place an order (requires authentication)

module.exports = router;
