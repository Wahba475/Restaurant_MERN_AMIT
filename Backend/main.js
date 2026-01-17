const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const dotenv = require('dotenv');
const { connectDB } = require('./db/db_connection');
const menuRouter = require('./Routers/Menue_Router');
const userRouter = require('./Routers/User_Router');
dotenv.config();

app.use(express.json());

connectDB();
app.use(cors());
app.use('/api/menu', menuRouter);
app.use('/api/user', userRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

