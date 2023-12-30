const mongoose = require('mongoose')
const schema = mongoose.Schema()
const { v4: uuidv4 } = require('uuid')

const adminSchema = new schema({
    _id: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    pwd: { type: String, required: true }
})

const adminModel = mongoose.model('admins', adminSchema)

module.exports = { adminModel }