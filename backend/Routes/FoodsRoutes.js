const express = require('express');
const router = express.Router();
const Foods = require('../Models/FoodsModel')

router.post("/add", async(req, res) => {
    try{
        const food = {
            foodName : req.body.foodName, 
            description : req.body.description,
            price : req.body.price,
            foodImage : req.body.foodImage
        }
        const newFood = new Foods(food);
        await newFood.save()
        res.send(newFood);

    }catch(err){
        res.send(err)
    }
})

router.get("/", async(req, res) =>{
    try{
        const food = await Foods.find()
        res.send(food)

    }catch(err){
        res.send(err)
    }
})

router.get("/:id", async(req, res) =>{
    try{
        const id = req.params.id
        const food = await Foods.findById(id)
        res.send(food)

    }catch(err){
        res.send(err)
    }
})

router.put('/:id', async (req,res)=>{
    try{
        const id = req.params.id
        const newFood = req.body
        const food = await Foods.findByIdAndUpdate(id, newFood)
        res.send(food)

    }catch(err){
        res.send(err)
    }
});

router.delete("/:id", async(req, res) =>{
    try{
        const id = req.params.id
        const food = await Foods.findByIdAndDelete(id)
        res.send(food)

    }catch(err){
        res.send(err)
    }
})

module.exports = router;