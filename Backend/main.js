const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const dotenv = require('dotenv');
const { connectDB } = require('./db/db_connection');
const menuRouter = require('./Routers/Menue_Router');
const userRouter = require('./Routers/User_Router');
const cartRouter = require('./Routers/Cart_Router');
const orderRouter = require("./Routers/Order_Router");
const stripeRouter = require('./Routers/Stripe_Router');
const stripeWebhookRouter = require('./Routers/stripeWebhookRoutes');
const bookingRouter = require('./Routers/Booking_Router');
const adminRouter = require('./Routers/Admin_Router');
dotenv.config();

app.use(express.json());

connectDB();
app.use(cors());
app.use('/api/menu', menuRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use("/api/orders", orderRouter);
app.use('/api/stripe', stripeRouter);
app.use('/api/stripe/webhook', stripeWebhookRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/admin', adminRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

