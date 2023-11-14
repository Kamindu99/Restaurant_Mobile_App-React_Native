const mongoose = require('mongoose')

const dbConnection = () =>{
    const MONGO_URL = "mongodb+srv://janith:123@cluster0.v4scjf7.mongodb.net/?retryWrites=true&w=majority"

    mongoose.connect(MONGO_URL, ()=> {
        console.log("Database connection Success")
    })
}

module.exports = {dbConnection} 