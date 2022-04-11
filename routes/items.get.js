const express = require('express')
const router = express.Router()
const Item = require('../models/Item')
const Bid = require('../models/Bid')

const verifyToken = require('../verifyToken')
const { process_params } = require('express/lib/router')

// Show all items for sale
router.get('/', verifyToken, async(req,res)=>{
    try {
        const items = await Item.find({expiry_date:{ $gt: new Date() }},{__v:0,owner:0, description:0}).sort({expiry_date: -1})
        res.send(items)    
    } catch(err){
        res.status(400).send({message:err})
    }
})

// Show all items for sale
router.get('/:itemId/max', verifyToken, async(req,res)=>{
    try {
        const item = await Item.findById(req.params.itemId)
        const bids = await Bid.findOne({item:req.params.itemId},{_id:0, item:0,__v:0}).sort({price:-1}).populate('bids').exec((err,items) => {
            if (err) return handleError(err);
            console.log(items.bids[0].body);
        })
        console.log(item)
        console.log(bids)
        res.send(bids)    
    } catch(err){
        res.status(400).send({message:err})
    }
})

// Show item by ID
router.get('/:itemId', verifyToken, async(req,res)=>{
    try {
        const item = await Item.findById(req.params.itemId)
        res.send(item)    
    } catch(err){
        res.status(400).send({message:err})
    }
})

// GET 3 (Show item bid history)
router.get('/:itemId/bid-history', verifyToken, async(req,res)=>{
    try {
        const bids = await Bid.find({item:req.params.itemId},{_id:0, item:0,__v:0})
        res.send(bids)    
    } catch(err){
        res.status(400).send({message:err})
    }
})

module.exports = router