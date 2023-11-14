const express = require('express');
const router = express.Router();
const Inquiry = require('../Models/inquiryModel')

router.post("/add", async(req, res) => {
    try{
        const userinquiry = {
            name : req.body.name, 
            phone : req.body.phone,
            email : req.body.email,
            inq : req.body.inq,
            userid : req.body.userid
        }
        
        const newInquiry = new Inquiry(userinquiry);
        await newInquiry.save()
        res.send(newInquiry);

    }catch(err){
        res.send(err)
    }
})

router.get("/", async(req, res) =>{
    try{
        const userinquiry = await Inquiry.find()
        res.send(userinquiry)

    }catch(err){
        res.send(err)
    }
})


router.get("/:id", async(req, res) =>{
    try{
        const id = req.params.id
        const userinquiry = await Inquiry.findById(id)
        res.send(userinquiry)

    }catch(err){
        res.send(err)
    }
})


router.get('/book/:userid', async(req, res) =>{
    try{
       
        let booking = await Inquiry.find({ userid: req.params.userid })
       
        res.json(booking)

    }catch(err){
        res.send(err)
    }
})

router.put("/:id", async(req, res) =>{
    try{
        const id = req.params.id
        const newInquiry = req.body
        const userinquiry = await Inquiry.findByIdAndUpdate(id, newInquiry)
        res.send(userinquiry)

    }catch(err){
        res.send(err)
    }
})

router.delete("/:id", async(req, res) =>{
    try{
        const id = req.params.id
        const userinquiry = await Inquiry.findByIdAndDelete(id)
        res.send(userinquiry)

    }catch(err){
        res.send(err)
    }
})


module.exports = router;
