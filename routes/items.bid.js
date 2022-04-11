const express = require('express')
const router = express.Router()
const Item = require('../models/Item')
const Bid = require('../models/Bid')
const verifyToken = require('../verifyToken')
const {bidValidation} = require('../validations/validation')
const mongoose = require('mongoose')

router.post('/:itemId/bid', verifyToken, async(req,res)=>{
    // validation to check user input
    const {error} = bidValidation(req.body)
    if(error){
        return res.status(400).send({message:error['details'][0]['message']})
    }

    // validation to check bid
    try {
    const item = await Item.findById(req.params.itemId)
    const maxBid = await Bid.findOne({item: req.params.itemId, price:{$gte: req.body.price}})
    if(item.owner === req.user._id) {
        return res.status(400).send({message:'Bid must not be on one of your own items.'})
    } else if (maxBid) {
        return res.status(400).send({message:'Bid must be higher than current max bid.'})
    } else if (item.expiry_date < new Date()) {
        return res.status(400).send({message:'Bid must be on an active auction.'})
    }} catch (err) {
        return res.status(400).send({message:err})
    }
    
    // code to insert data
        const DBitem = Bid({
        price: req.body.price,
        _id: req.params.itemId,
        owner:req.user._id
    })

    try {
        const savedItem = await DBitem.save()
        res.redirect(200, '/:itemId')
    } catch(err){
        res.status(400).send({message:err})
    }
})

module.exports = router