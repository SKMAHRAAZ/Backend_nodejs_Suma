const express = require('express')

const mongoose = require('mongoose')
const dotenv = require('dotenv')
const path = require('path')


const VendorRoutes = require('./Routes/VendorRoutes')
const FirmRoute = require('./Routes/FirmRoute')
const ProductRoute = require('./Routes/ProductRoute')

dotenv.config()


mongoose.connect(process.env.Mongo_URI)
.then(()=>{
    console.log("MongoDB connected sucessfully")
})
.catch((err)=>{
    console.log(err)
})

const PORT = process.env.PORT||4000;
const app = express()


app.use(express.json())




app.use('/vendor',VendorRoutes)
app.use('/firm', FirmRoute )
app.use('/product',ProductRoute)
app.use('/uploads',express.static('uploads'))

app.listen(PORT, ()=>{
    console.log(`server running at ${PORT}`)
})