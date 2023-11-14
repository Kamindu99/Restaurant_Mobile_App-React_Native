const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const {dbConnection} =require('./dbCon')

const tableRoute = require('./Routes/TableRoutes')
const tableBookingRoute = require('./Routes/TableBookingRoutes')
const userRoute = require('./Routes/userRoutes')
const inquiryRoute = require('./Routes/InquiryRoutes')

const app = express();

app.use(express.json())
app.use(bodyParser.json())
app.use(cors());


app.use('/table', tableRoute)
app.use('/tablebooking', tableBookingRoute)
app.use('/user', userRoute)
app.use('/inquiry', inquiryRoute)


const foodRoute = require('./Routes/FoodsRoutes')
app.use('/food', foodRoute)

const foodOrderRoute = require('./Routes/FoodOrderRoutes')
app.use('/food-order', foodOrderRoute)


const PORT = 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    dbConnection();
})