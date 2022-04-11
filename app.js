const express = require('express')
const app = express()

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')

app.use(bodyParser.json())

const itemsGetRoute = require('./routes/items.get')
const itemsSellRoute = require('./routes/items.sell')
const itemsBidRoute = require('./routes/items.bid')
const authRoute = require('./routes/user.auth')
const accountRoute = require('./routes/user.account')

app.use('/api/items',itemsGetRoute)
app.use('/api/items',itemsSellRoute)
app.use('/api/items',itemsBidRoute)
app.use('/api/user',authRoute)
app.use('/api/user',accountRoute)


mongoose.connect(process.env.DB_CONNECTOR, ()=>{
    console.log('DB is connected')
})

app.listen(3000, ()=>{
    console.log('Server is running')
})