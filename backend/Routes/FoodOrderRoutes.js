const express = require('express');
const router = express.Router();
const FoodOrders = require('../Models/FoodOrderModel')


router.post("/add", async(req, res) => {
    try{
        const user = {
            cusname:req.body.cusname,
            address:req.body.address,
            phone:req.body.phone,
            foodname:req.body.foodname,
            quantity:req.body.quantity,
            total:req.body.total,
            userid:req.body.userid,
            foodId:req.body.foodId
        }
        
        const newOrder = new FoodOrders(user);
        await newOrder.save()
        res.send(newOrder);

    }catch(err){
        res.send(err)
    }
})

router.get("/", async(req, res) =>{
    try{
        const foodorder = await FoodOrders.find()
        res.send(foodorder)

    }catch(err){
        res.send(err)
    }
})


router.get("/:id", async(req, res) =>{
    try{
        const id = req.params.id
        const foodorder = await FoodOrders.findById(id)
        res.send(foodorder)

    }catch(err){
        res.send(err)
    }
})

router.get('/order/:userid', async(req, res) =>{
    try{
       
        let foodorder = await FoodOrders.find({ userid: req.params.userid })
       
        res.json(foodorder)

    }catch(err){
        res.send(err)
    }
})

router.put("/:id", async(req, res) =>{
    try{
        const id = req.params.id
        const newOrder = req.body
        const foodorder = await FoodOrders.findByIdAndUpdate(id, newOrder)
        res.send(foodorder)

    }catch(err){
        res.send(err)
    }
})

router.delete("/:id", async(req, res) =>{
    try{
        const id = req.params.id
        const foodorder = await FoodOrders.findByIdAndDelete(id)
        res.send(foodorder)

    }catch(err){
        res.send(err)
    }
})

module.exports = router;