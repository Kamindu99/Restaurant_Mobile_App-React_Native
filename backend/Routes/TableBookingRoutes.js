const express = require('express');
const router = express.Router();
const Booking = require('../Models/TableBookingsModel')


router.post("/add", async(req, res) => {
    try{
        const user = {
            name : req.body.name, 
            tableId : req.body.tableId,
            tabletype : req.body.tabletype,
            userid : req.body.userid,
            date : req.body.date,
            time : req.body.time,
            phone : req.body.phone
            
        }
        
        const newBooking = new Booking(user);
        await newBooking.save()
        res.send(newBooking);

    }catch(err){
        res.send(err)
    }
})

router.get("/", async(req, res) =>{
    try{
        const bookings = await Booking.find()
        res.send(bookings)

    }catch(err){
        res.send(err)
    }
})


router.get("/:id", async(req, res) =>{
    try{
        const id = req.params.id
        const booking = await Booking.findById(id)
        res.send(booking)

    }catch(err){
        res.send(err)
    }
})

router.get('/book/:userid', async(req, res) =>{
    try{
       
        let booking = await Booking.find({ userid: req.params.userid })
       
        res.json(booking)

    }catch(err){
        res.send(err)
    }
})







router.put("/:id", async(req, res) =>{
    try{
        const id = req.params.id
        const newBooking = req.body
        const booking = await Booking.findByIdAndUpdate(id, newBooking)
        res.send(booking)

    }catch(err){
        res.send(err)
    }
})

router.delete("/:id", async(req, res) =>{
    try{
        const id = req.params.id
        const booking = await Booking.findByIdAndDelete(id)
        res.send(booking)

    }catch(err){
        res.send(err)
    }
})

module.exports = router;