
const express = require('express');
const router = express.Router();
const { authenticate } = require('../utils/authenticate');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController.js');
const menuController = require('../controllers/menuController');
const cartController = require('../controllers/cartController');
const orderController = require('../controllers/orderController');

// User routes
router.post('/users/signup', userController.signup);
router.post('/users/login', authController.login);
router.put('/users/:id', authenticate, userController.updateUser);
router.delete('/users/:id',authenticate, userController.deleteUser);
router.get('/users', userController.getUsers);
router.post('/getuserbyid', userController.getUsersById);



// Menu routes
router.get('/menu', authenticate, menuController.getMenuItems);

// Cart routes
router.post('/cart', authenticate, cartController.addToCart);
router.get('/cart', authenticate, cartController.viewCart);
router.delete('/cart/:itemId', authenticate, cartController.removeFromCart);

// Order routes
router.post('/orders', authenticate, orderController.createOrder);

module.exports = router;
