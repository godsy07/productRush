const mongoose = require("mongoose")

const connectToDB = () => {
    const dbURL = process.env.DB_URL
    // https://mongoosejs.com/docs/connections.html
    mongoose.connect(dbURL);
    mongoose.connection.on('open', () => console.log('DB has been connected'));
    mongoose.connection.on('error', console.error.bind(console, "Connection error: "));
}

module.exports = { connectToDB }