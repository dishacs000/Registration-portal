const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const { mongoURL } = require('../Constants/index')

const connectToDb = async () => {
    const connection = await mongoose.connect(mongoURL)
    switch (connection.connection.readyState) {
        case 0: console.log(`Connection to database failed`); break
        case 1: console.log(`Connection to databse successful`); break
        case 2: console.log('Server is trying to connect to database'); break
        case 3: console.log('Disconnecting from database'); break
    }
    return connection
}

module.exports = { connectToDb }