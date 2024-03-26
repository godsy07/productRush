const cors = require('cors')
const http = require('http');
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');

require('dotenv').config();

const { connectToDB } = require('./config/db');

const userRoutes = require('./src/routes/userRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const productRoutes = require('./src/routes/productRoutes');

const app = express();

const corsOptions = {
  origin: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(express.static("public"));
app.use(mongoSanitize({ replaceWith: "_" }));

connectToDB();

app.use("/product-rush/api/user", userRoutes);
app.use("/product-rush/api/order", orderRoutes);
app.use("/product-rush/api/category", categoryRoutes);
app.use("/product-rush/api/product", productRoutes);

app.get('/', (req, res) => {
  return res.status(200).json({ status: true, message: "Welcome to Product Rush." })
})

const server = http.createServer(app);

const HOST = process.env.HOST ? process.env.HOST : "http://localhost"
const PORT_NO = process.env.PORT ? process.env.PORT : 5002
server.listen(PORT_NO, () => {
    console.log(`Server is listeing on ${HOST}:${PORT_NO}`);
})
