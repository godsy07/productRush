const express = require('express');
const http = require('http');
const { connectToDB } = require('./config/db');

require('dotenv').config();

const app = express();

connectToDB();

app.get('/', (req, res) => {
    return res.status(200).json({ status: true, message: "Welcome to Product Rush." })
})

const server = http.createServer(app);

const HOST = process.env.HOST ? process.env.HOST : "http://localhost"
const PORT_NO = process.env.PORT ? process.env.PORT : 5002
server.listen(PORT_NO, () => {
    console.log(`Server is listeing on ${HOST}:${PORT_NO}`);
})
