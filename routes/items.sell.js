const express = require('express')
const router = express.Router()
const verifyToken = require('../verifyToken')
const Item = require('../models/Item')
const {itemValidation} = require('../validations/validation')

router.post('/sell', verifyToken, async(req,res)=>{
    // validation to check user input
    const {error} = itemValidation(req.body)
    if(error){
        return res.status(400).send({message:error['details'][0]['message']})
    }

    // code to insert data
        const DBitem = Item({
        title: req.body.title,
        description: req.body.description,
        condition: req.body.condition,
        expiry_date: new Date(req.body.auction_date),
        owner:req.user._id
    })

    try {
        const savedItem = await DBitem.save()
        res.send(savedItem)
    } catch(err){
        res.status(400).send({message:err})
    }
})

module.exports = router