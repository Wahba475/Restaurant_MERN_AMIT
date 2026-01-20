const Stripe = require("stripe")
const Order = require("../models/OrderSchema")

const stripe = new Stripe(process.env.STRIPE_API_KEY)

const stripeWebhook = async (req, res) => {
  let event

  try {
    // 1️⃣ Verify this request REALLY came from Stripe
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  // 2️⃣ Payment SUCCESS
  if (event.type === "checkout.session.completed") {
    const session = event.data.object
    const orderId = session.metadata.orderId

    await Order.findByIdAndUpdate(orderId, {
      paymentStatus: "Paid",
    })
  }

  // 3️⃣ Payment FAILED
  if (event.type === "payment_intent.payment_failed" || event.type === "checkout.session.async_payment_failed") {
    const session = event.data.object
    const orderId = session.metadata.orderId

    await Order.findByIdAndUpdate(orderId, {
      paymentStatus: "Failed",
      status: "Rejected", // Reject order if payment fails
    })
  }

  // 4️⃣ Tell Stripe: "OK, received"
  res.json({ received: true })
}

module.exports = { stripeWebhook }
