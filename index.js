const express = require('express');
const http = require('http');

require('dotenv').config();

const app = express();

const server = http.createServer(app);

const HOST = process.env.HOST?process.env.HOST:"http://localhost"
const PORT_NO = process.env.PORT?process.env.PORT:5002
server.listen(PORT_NO, () => {
    console.log(`Server is listeing on ${HOST}:${PORT_NO}`);
})
