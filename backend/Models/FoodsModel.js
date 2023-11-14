const mongoose = require('mongoose')
const Schema =  mongoose.Schema

const FoodSchema = new Schema({
    foodName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    foodImage:{
        type:String,
        required:true
    }

},{
    timestamps:true
})

const foods = mongoose.model('foods' , FoodSchema)

module.exports = foods