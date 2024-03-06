const http = require('http');
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');

require('dotenv').config();

const { connectToDB } = require('./config/db');

const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(express.static("public"));
app.use(
  mongoSanitize({
    replaceWith: "_",
  }),
);

connectToDB();

app.use("/product-rush/user", userRoutes);

app.get('/', (req, res) => {
    return res.status(200).json({ status: true, message: "Welcome to Product Rush." })
})

const server = http.createServer(app);

const HOST = process.env.HOST ? process.env.HOST : "http://localhost"
const PORT_NO = process.env.PORT ? process.env.PORT : 5002
server.listen(PORT_NO, () => {
    console.log(`Server is listeing on ${HOST}:${PORT_NO}`);
})
