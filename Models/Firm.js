const mongoose = require('mongoose')

const firmSchema = new mongoose.Schema({
    firmname:{
        type:String,
        required: true
    },
    area:{
        type:String,
        required: true
    },
    category:{
        type:[{
            type:String,
            enum:['non-veg', 'veg']
        }]
    },
    region:{
        type:[{
            type:String,
            enum:['south-indian', 'north-indian','chinese','bakery']
        }]
    },

    offer:{
        type:String,

    },
    image:{
        type:File
    },
    vendor:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'vendor'
    }],
    product:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    }]

    
})


const Firm = mongoose.model('firm', firmSchema)

module.exports = Firm