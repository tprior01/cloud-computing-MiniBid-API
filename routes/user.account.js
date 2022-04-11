const express = require('express')
const router = express.Router()

const User = require('../models/User')
const Items = require('../models/Item')
const Bids = require('../models/Bid')

const verifyToken = require('../verifyToken')

router.get('/account-details', verifyToken, async(req,res)=>{
    try {
        const user_details = await User.find({_id:req.user._id},{password:0, registration_date:0, __v:0})
        res.send(user_details)    
    } catch(err){
        res.status(400).send({message:err})
    }
})

router.get('/items-for-sale/', verifyToken, async(req,res)=>{
    try {
        const items = await Items.find({owner:req.user._id,expiry_date:{ $gt: new Date() }},{owner:0})
        res.send(items)    
    } catch(err){
        res.status(400).send({message:err})
    }
})

router.get('/bid-history/', verifyToken, async(req,res)=>{
    try {
        const items = await Bids.find({owner:req.user._id},{_id:0, owner:0, __v:0})
        res.send(items)    
    } catch(err){
        res.status(400).send({message:err})
    }
})

module.exports = router