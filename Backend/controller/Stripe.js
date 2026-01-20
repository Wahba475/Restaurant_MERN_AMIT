const stripe = require("../config/Stripe")
const Order = require("../models/OrderSchema")

const StripeSession = async (req, res) => {
    try {
        // 2️⃣ Data coming from frontend
        // orderId: MongoDB order ID
        // items: order items (name, price, quantity)
        const { orderId, items } = req.body

        // 3️⃣ Create a Stripe Checkout Session
        // This DOES NOT charge money
        // It only prepares a payment page on Stripe
        const session = await stripe.checkout.sessions.create({
            // Stripe will show card input UI
            payment_method_types: ["card"],

            // Stripe receipt (what the user is paying for)
            line_items: items.map(item => ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: item.price * 100, // cents
                },
                quantity: item.quantity,
            })),

            // One-time payment
            mode: "payment",

            // Where to send the user AFTER payment (UX only)
            success_url: "http://localhost:5173/success",

            // Where to send the user if they cancel
            cancel_url: "http://localhost:5173/cancel",

            // Custom data you want Stripe to send back in webhook
            metadata: {
                orderId: orderId,
            },
        })

        // 4️⃣ Store Stripe session ID in your DB
        // This links the Stripe payment to your order
        await Order.findByIdAndUpdate(orderId, {
            stripeSessionId: session.id,
        })

        // 5️⃣ Send the Stripe payment page URL to frontend
        res.json({ url: session.url })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { StripeSession }
