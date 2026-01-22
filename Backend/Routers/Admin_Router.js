const express = require('express');
const router = express.Router();

const { LoginAdmin, getAllMenuItems, addMenuItem, updateMenuItem, deleteMenuItem,
    getAllBookings,
    updateBookingStatus,
    deleteBooking,
    getAllOrders,
    updateOrderStatus,
    deleteOrder,
    getAllUsers,
    deleteUser } = require('../controller/Admin');

const { protect } = require('../Middleware/AdminAuth');
const {upload} = require('../Middleware/upload');

router.post('/login', LoginAdmin);

router.use(protect);


router.get('/menu', getAllMenuItems);
router.post('/menu',upload.single('image'), addMenuItem);
router.put('/menu/:id',upload.single('image'), updateMenuItem);
router.delete('/menu/:id', deleteMenuItem);

router.get('/bookings', getAllBookings);
router.put('/bookings/:id', updateBookingStatus);
router.delete('/bookings/:id', deleteBooking);

router.get('/orders', getAllOrders);
router.put('/orders/:id', updateOrderStatus);
router.delete('/orders/:id', deleteOrder);

router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);

module.exports = router;
