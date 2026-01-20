const express = require("express");
const router = express.Router();
const { StripeSession } = require("../controller/Stripe");
const { protect } = require("../Middleware/UserToken");

router.post("/create-checkout-session", protect, StripeSession);

module.exports = router;
