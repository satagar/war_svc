const dotenv = require('dotenv').config
module.exports = {
    PORT: process.env.PORT || 4000,
    ENV: process.env.NODE_ENV,
    HOST: process.env.HOST
}