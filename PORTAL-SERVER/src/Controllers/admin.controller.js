const { registrationModel } = require('../Models/registration')
const qrcode = require('qrcode')
const axios = require('axios');
const { webhook_url } = require('../Constants');


const registerNewCanidate = async (body) => {
    try {
        const doc = await new registrationModel({ name: body.name, items: body.items, college: body.college, department: body.department, email: body.email, phone: body.phone, event: body.event ,registerId:body.registerId}).save()
        const qrCodeURL = await qrcode.toDataURL(doc._id)
        const updatedDoc = await registrationModel.findOneAndUpdate({ _id: doc._id }, { qrUrl: qrCodeURL }, { new: true })
        return updatedDoc
    } catch (err) {
        throw err
    }
}

const getAllCandidates = async (req) => {
    try {
        let {query}=req
        let page = query.page >= 1 ? query.page : 1;
        page = page - 1
        const limit = 10
        const registration = await registrationModel.find({valid:true}).limit(limit).skip(limit * parseInt(page)).sort(req.query.sort)
        return registration
    } catch (err) {
        console.log(err)
        throw err
    }
}

const markRegistrationAsRead = async (req) => {
    try {
        const { id } = req.query
        const updatedDoc = await registrationModel.findOneAndUpdate({ _id: id }, { $set: { valid: false } }, { new: true })
        return updatedDoc
    } catch (err) {
        throw err
    }
}


const getCandidate = async (req) => {
    try {
        const { id } = req.query
        const registration = await registrationModel.findOne({ _id: id })
        return registration
    } catch (err) {
        throw err
    }
}

const searchCandidate = async (req) => {
    try {
        const registration = await registrationModel.find({ name: { $regex: req.query.name, "$options": "i" } }).limit(10)
        return registration
    } catch (err) {
        throw err
    }
}

const filterCandidate = async (req) => {
    try {
        const registration = await registrationModel.find(req.query)
        return registration
    } catch (err) {
        throw err
    }
}

const deleteCandidate = async (req)=>{
    try {
        const document = await registrationModel.findOne({_id:req.query.id}).select('-qrUrl -_id')
        const embed = {
            title: 'Registration Deleted',
            description: `The following registration has been deleted: ${JSON.stringify(document)}`
          };
          
        const message = {
            content: `Registration Deleted `,
            embeds:[embed]
          };
          axios.post(webhook_url,message)
          .then((response)=> console.log('Message sent:', response.data))
          .catch((err)=>console.log(err))
        const registration = await registrationModel.findOneAndDelete({_id:req.query.id})
        return registration
    } catch (err) {
        throw err
    }
}

const getTotalNumberOfValidRegistrations = async (req)=>{
    try {
        const registration = await registrationModel.find({valid:true}).count()
        return registration
    } catch (err) {
        throw err
    }
}

module.exports = { registerNewCanidate, getCandidate, markRegistrationAsRead, getAllCandidates, searchCandidate, filterCandidate ,deleteCandidate,getTotalNumberOfValidRegistrations }