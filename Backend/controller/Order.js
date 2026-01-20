const Order = require("../models/OrderSchema");
const User = require("../models/UserSchema");


const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      address,
      phone,
      orderNotes,
      paymentMethod,
      items,
      totalPrice
    } = req.body;

    const order = new Order({
      user: req.user._id,     
      customerName,
      address,
      phone,
      orderNotes,
      paymentMethod,
      items,
      totalPrice,
      status: "Pending"   ,
      paymentStatus: "Pending",
    });

    await order.save();
    await User.findByIdAndUpdate(req.user._id, {
      cart: []
    });
    

    res.status(201).json({
      success: true,
      order
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { createOrder, getMyOrders };


