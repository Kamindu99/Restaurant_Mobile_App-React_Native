const mongoose = require('mongoose')

const Schema =  mongoose.Schema

const TableSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    users:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }

},{
    timestamps:true
})

const table = mongoose.model('Table' , TableSchema)

module.exports = table