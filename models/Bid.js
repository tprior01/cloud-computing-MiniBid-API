const mongoose = require('mongoose')


function formatPrice(price) {
    return "£" + (price/100).toFixed(2)
}

const bidSchema = mongoose.Schema({
    price:{
        type:Number,
        require:true,
        get: formatPrice
    },
    _id:{
        type:String,
        require:true
    },
    owner:{
        type:String,
        require:true
    },
    bid_date:{
        type:Date,
        default:Date.now
    }},
    {
        toJSON : {getters: true}
})

module.exports = mongoose.model('bid', bidSchema)