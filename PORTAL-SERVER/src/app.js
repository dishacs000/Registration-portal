const express = require('express');
const { connectToDb } = require('./Connections/mongo.connection');
require('dotenv').config();
const adminRouter = require('./Routes/admin')
const cors = require('cors')
const request = require('request')

const app = express();
app.use(cors({ origin: "*" }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/admin', adminRouter)


app.listen(process.env.PORT || 8080, async () => {
    console.log("Portal Server is Running on PORT ")
    // var request = require("request");

    // var options = {
    //     method: 'POST',
    //     url: 'https://api.ultramsg.com/instance43707/messages/chat',
    //     headers: { 'content-type': 'application/x-www-form-urlencoded' },
    //     form: {
    //         token: '40jroiqaf9d5u2t6',
    //         to: '9497664876',
    //         body: 'WhatsApp API on UltraMsg.com works good',
    //         priority: '10',
    //         referenceId: ''
    //     }
    // };

    // request(options, function (error, response, body) {
    //     if (error) throw new Error(error);

    //     console.log(body);
    // });
    connectToDb()
});
