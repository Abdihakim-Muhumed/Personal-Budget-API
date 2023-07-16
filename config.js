const dotenv = require('dotenv');
dotenv.config();

// DB_CONFIG
const DB_CONFIG = {
    username: process.env.USERNAME,
    host: process.env.HOST,
    database: process.env.DB,
    password: process.env.PASSWORD, 
    port:process.env.DB_PORT
}

module.exports = {
    DB_CONFIG
}