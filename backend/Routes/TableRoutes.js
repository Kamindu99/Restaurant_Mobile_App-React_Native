const express = require('express');
const router = express.Router();
const Table = require('../Models/TableModel')


router.post("/add", async(req, res) => {
    try{
        const table = {
            name : req.body.name, 
            description : req.body.description,
            users : req.body.users,
            image : req.body.image
        }
        
        const newTable = new Table(table);
        await newTable.save()
        res.send(newTable);

    }catch(err){
        res.send(err)
    }
})

router.get("/", async(req, res) =>{
    try{
        const table = await Table.find()
        res.send(table)

    }catch(err){
        res.send(err)
    }
})


router.get("/:id", async(req, res) =>{
    try{
        const id = req.params.id
        const table = await Table.findById(id)
        res.send(table)

    }catch(err){
        res.send(err)
    }
})

router.put("/:id", async(req, res) =>{
    try{
        const id = req.params.id
        const newTable = req.body
        const table = await Table.findByIdAndUpdate(id, newTable)
        res.send(table)

    }catch(err){
        res.send(err)
    }
})

router.delete("/:id", async(req, res) =>{
    try{
        const id = req.params.id
        const table = await Table.findByIdAndDelete(id)
        res.send(table)

    }catch(err){
        res.send(err)
    }
})

module.exports = router;