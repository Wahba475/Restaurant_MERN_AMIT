const MenuItem = require('../models/menuSchema');
const Booking = require('../models/BookingSchema');
const Orders = require('../models/OrderSchema');
const User = require('../models/UserSchema');
const jwt = require('jsonwebtoken');

// -------------------------------------------------
// admin Login (Not currently attached to Admin Router, but keeping logic)
// -------------------------------------------------

const LoginAdmin = async (req, res) => {
    const { email, password } = req.body;

    if (
        email !== process.env.ADMIN_EMAIL ||
        password !== process.env.ADMIN_PASSWORD
    ) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
        { role: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    );

    res.status(200).json({
        email,
        role: 'admin',
        token,
    });
};


/* =====================================================
   MENU MANAGEMENT (ADMIN)
===================================================== */

const getAllMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.find();
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addMenuItem = async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      description,
      prepTime = 0,
      available = true,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const menuItem = await MenuItem.create({
      name,
      category,
      price,
      description,
      prepTime,
      available,
      // CloudinaryStorage provides a URL, not a local path
      image: req.file.path || req.file.secure_url,
    });

    res.status(201).json(menuItem);
  } catch (error) {
    console.error("Add Menu Item Error:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateMenuItem = async (req, res) => {
    try {
        const updates = { ...req.body };

        if (req.file) {
            updates.image = req.file.path;
        }

        const updatedItem = await MenuItem.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteMenuItem = async (req, res) => {
    try {
        const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);

        if (!deletedItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* =====================================================
   BOOKINGS MANAGEMENT (ADMIN)
===================================================== */

const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('user', 'name email')
            .sort({ bookingDateTime: -1 });

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* =====================================================
   ORDERS MANAGEMENT (ADMIN)
===================================================== */

const getAllOrders = async (req, res) => {
    try {
        const orders = await Orders.find()
            .populate('user', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Orders.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const order = await Orders.findByIdAndDelete(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* =====================================================
   USER MANAGEMENT (ADMIN)
===================================================== */

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* =====================================================
   EXPORTS
===================================================== */

module.exports = {
    LoginAdmin, // Exporting it just in case, though might be unused depending on auth router
    // menu
    getAllMenuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,

    // bookings
    getAllBookings,
    updateBookingStatus,
    deleteBooking,

    // orders
    getAllOrders,
    updateOrderStatus,
    deleteOrder,

    // users
    getAllUsers,
    deleteUser,
};
