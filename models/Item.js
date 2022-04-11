const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    title:{
        type:String,
        require:true,
        min:1,
        max:256
    },
    description:{
        type:String,
        require:true,
        min:1,
        max:1024
    },
    condition:{
        type:String,
        require:true,
        enum:['New','Used']

    },
    registration_date:{
        type:Date,
        default:Date.now
    },
    expiry_date:{
        type:Date,
        require:true
    },
    owner:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('items', itemSchema)