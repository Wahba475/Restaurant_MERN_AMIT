const express = require('express');
const router = express.Router();
const {protect} = require('../Middleware/UserToken');

const { addToCart, decreaseQuantity, removeFromCart, getCart } = require('../controller/Cart');

router.post('/add-to-cart', protect, addToCart);
router.put('/decrease-quantity', protect, decreaseQuantity);
router.delete('/remove-from-cart', protect, removeFromCart);
router.get('/get-cart', protect, getCart);

module.exports = router; 