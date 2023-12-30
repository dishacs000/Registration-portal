const express = require('express')
const router = express.Router()
const { registerNewCanidate, getCandidate, markRegistrationAsRead ,getAllCandidates, searchCandidate ,filterCandidate , deleteCandidate, getTotalNumberOfValidRegistrations} = require('../Controllers/admin.controller')
const Response = require('../Classes/Response')


router.post('/login', (req, res) => {
    const { name, pwd } = req.body
    if (name == "admin" && pwd == "cek") {
        res.send({ loggedIn: true })
    } else {
        res.send({ loggedIn: false })
    }
})

router.post('/register', async (req, res) => {
    let doc = await registerNewCanidate(req.body)
    .then((response) => new Response(200, response, false))
    .catch((err) => new Response(400, null, true))
    res.send(doc)
})

router.get('/registration', async (req, res) => {
    let response = await getCandidate(req)
    .then((response) => new Response(200, response, false))
    .catch((err) => new Response(400, null, true))
    res.status(response.status).send(response)
})

router.patch('/registration/markasread', async (req, res) => {
    let response = await markRegistrationAsRead(req)
    .then((response) => new Response(200, response, false))
    .catch((err) => new Response(400, null, true))
    res.status(response.status).send(response)
})

router.get('/registrations/all', async (req, res) => {
    let response = await getAllCandidates(req)
    .then((response) => new Response(200, response, false))
    .catch((err) => new Response(400, null, true))
    res.status(response.status).send(response)
})


router.get('/registration/search', async (req, res) => {
    let response = await searchCandidate(req)
    .then((response) => new Response(200, response, false))
    .catch((err) => new Response(400, null, true))
    res.status(response.status).send(response)
})

router.get('/registration/filter', async (req, res) => {
    let response = await filterCandidate(req)
    .then((response) => new Response(200, response, false))
    .catch((err) => new Response(400, null, true))
    res.status(response.status).send(response)
})


router.delete('/registration/delete', async (req, res) => {
    let response = await deleteCandidate(req)
    .then((response) => new Response(200, response, false))
    .catch((err) => new Response(400, null, true))
    res.status(response.status).send(response)
})


router.get('/registrations/valid/total', async (req, res) => {
    let response = await getTotalNumberOfValidRegistrations(req)
    .then((response) => new Response(200, {total:response}, false))
    .catch((err) => new Response(400, null, true))
    res.status(response.status).send(response)
})

module.exports = router