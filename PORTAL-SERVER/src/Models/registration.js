const mongoose = require('mongoose')
const schema = mongoose.Schema
const { v4: uuidv4 } = require('uuid')

const registrationSchema = new schema({
    _id: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    college: { type: String, required: true },
    department: { type: String, required: true },
    email: { type: String, default:'' },
    phone: { type: Number, required: true },
    event: { type: String, default: "Coding Challenge" },
    items: { type: Array, default: [] },
    valid: { type: Boolean, default: true },
    qrUrl: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    registerId: { type: Number, required: false }
})

registrationSchema.post('save', async function (doc, next) {
    try {
        let preIndex = await registrationModel.findOne().sort({ registerId: -1 })
        if (preIndex.registerId) {
            await registrationModel.updateOne({ _id: doc._id }, { $set: { registerId: preIndex.registerId + 1 } })
            next()
        } else {
            let updatedDoc = await registrationModel.updateOne({ _id: doc._id }, { $set: { registerId: 1 } })
            next()
        }
    } catch (err) {
        throw err
    }
})

const registrationModel = mongoose.model('registrations', registrationSchema)
module.exports = { registrationModel }