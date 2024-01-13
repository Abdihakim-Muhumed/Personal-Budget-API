const dotenv = require('dotenv')
dotenv.config()

const NODE_ENV = process.env.NODE_ENV;

// DB_CONFIG
if(NODE_ENV=='development'){
    const DB_CONFIG = {
        username: process.env.USERNAME,
        host: process.env.HOST,
        database: process.env.DB,
        password: process.env.PASSWORD, 
        port:process.env.DB_PORT
    }
}else{
    const DB_CONFIG = {
        connectionString: process.env.DATABASE_URL,
    }
}
module.exports = {
    DB_CONFIG,
}