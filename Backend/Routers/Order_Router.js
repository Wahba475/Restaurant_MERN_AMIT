const express = require("express");
const router = express.Router();
const { createOrder, getMyOrders } = require("../controller/Order");
const { protect } = require("../Middleware/UserToken");

router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);

module.exports = router;