const mongoose = require('mongoose');
require('dotenv').config();

const ConnectToDB = async () => {
    await mongoose.connect(process.env.DB_URL);
    console.log('Connected to DB');
}

module.exports = {ConnectToDB};