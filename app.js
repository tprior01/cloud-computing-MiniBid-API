const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')
app.use(bodyParser.json())

const getRoute = require('./routes/itm.get')
const sellRoute = require('./routes/itm.sell')
const bidRoute = require('./routes/itm.bid')
const authRoute = require('./routes/usr.auth')
const accountRoute = require('./routes/usr.account')

app.use('/api/itm',getRoute)
app.use('/api/itm',sellRoute)
app.use('/api/itm',bidRoute)
app.use('/api/usr',authRoute)
app.use('/api/usr',accountRoute)

mongoose.connect(process.env.DB_CONNECTOR, ()=>{
    console.log('DB is connected')
})

app.listen(3000, ()=>{
    console.log('Server is running')
})