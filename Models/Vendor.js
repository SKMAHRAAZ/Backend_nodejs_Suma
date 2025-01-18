const mongoose = require('mongoose')


const vendorSchema = new mongoose.Schema({
    username:{
        type:String,
        requiried:true
    },
    email:{
        type:String,
        requiried:true
    },
    password:{
        type:String,
        requiried:true
    },
    firm:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'firm'
    }]
})

const Vendor = mongoose.model('vendor', vendorSchema)

module.exports = Vendor