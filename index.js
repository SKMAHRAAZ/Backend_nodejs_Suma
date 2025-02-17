const express = require('express')

const mongoose = require('mongoose')
const dotenv = require('dotenv')
const path = require('path')
const cors = require('cors')


const VendorRoutes = require('./Routes/VendorRoutes')
const FirmRoute = require('./Routes/FirmRoute')
const ProductRoute = require('./Routes/ProductRoute')
const app = express()
dotenv.config()

app.use(cors())


mongoose.connect(process.env.Mongo_URI)
.then(()=>{
    console.log("MongoDB connected sucessfully")
})
.catch((err)=>{
    console.log(err)
})

const PORT = process.env.PORT||4000;



app.use(express.json())




app.use('/vendor',VendorRoutes)
app.use('/firm', FirmRoute )
app.use('/product',ProductRoute)
app.use('/uploads',express.static('uploads'))


app.use('/',(req,res)=>{
    res.send("<h1>Welcome to Suma")

})

app.listen(PORT, ()=>{
    console.log(`server running at ${PORT}`)
})