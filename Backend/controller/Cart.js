const User = require('../models/UserSchema');


const addToCart = async (req, res) => {
  try {
    const user = req.user;
    const { productId } = req.body;

    const cartItem = user.cart.find(
      item => item.product.toString() === productId
    );

    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      user.cart.push({ product: productId });
    }

    await user.save();
    await user.populate('cart.product');
    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const decreaseQuantity = async (req, res) => {
  try {
    const user = req.user;
    const { productId } = req.body;

    const cartItem = user.cart.find(
      item => item.product.toString() === productId
    );

    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cartItem.quantity -= 1;

    if (cartItem.quantity <= 0) {
      user.cart = user.cart.filter(
        item => item.product.toString() !== productId
      );
    }

    await user.save();
    await user.populate('cart.product');
    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * REMOVE ITEM COMPLETELY
 */
const removeFromCart = async (req, res) => {
  try {
    const user = req.user;
    const { productId } = req.body;

    user.cart = user.cart.filter(
      item => item.product.toString() !== productId
    );

    await user.save();
    await user.populate('cart.product');
    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET CART
 */
const getCart = async (req, res) => {
  try {
    const user = req.user;
    await user.populate('cart.product');
    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addToCart,
  decreaseQuantity,
  removeFromCart,
  getCart
};
