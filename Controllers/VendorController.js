const Vendor = require('../Models/Vendor')
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


dotenv.config()

const secret = process.env.Secret
const vendorRegister = async(req, res)=>{

    try {
        const {username, email, password} = req.body;

    const vendorEmail = await Vendor.findOne({email})
    if(vendorEmail){
        res.status(400).send({error:"email already exists"})
    }

    const hashedpassword = await bcrypt.hash(password, 12)

    const newVendor = new Vendor({
        username,
        email,
        password:hashedpassword
    })

    await newVendor.save()
    res.status(200).send({message:"vendor registered sucessfully"})


    } catch (error) {

        console.log(error)
        res.status(500).send({error:"Internal error occured"})
        
    }
}



const vendorLogin = async(req,res)=>{
    try {
        

        const {email, password} = req.body

    const vendor = await Vendor.findOne({email})
    if(!vendor||!(await bcrypt.compare(password,vendor.password))){
        return res.status(404).send({error:"Invalid user credentials"})
    }

    const token  = jwt.sign({vendorId:vendor._id}, secret)

    res.status(200).send({message:"login sucessful", token})

    } catch (error) {

        console.log(error)
        res.status(500).send({error:"Internal error occured"})
        
    }
}


const  getAllVendors = async(req,res)=>{

    try {
        const vendor = await Vendor.find().populate('firm')
    if(!vendor){
        res.status(404).send({message:"no vendor found"})
    }

    return res.status(200).send(vendor)
        
    } catch (error) {

        console.log(error)
        res.status(500).send({error:"Internal error occured"})
        
    }
}

const getSingleVendor = async(req,res)=>{
    try {

        const singleVendor = await Vendor.findById(req.params.id).populate('firm')
        if(!singleVendor){
            res.status(404).send({message:"no vendor found"})
        }

        return res.status(200).send(singleVendor)
        
    } catch (error) {
        console.log(error)
        res.status(500).send({error:"Internal error occured"})
        
        
    }
}

module.exports = {vendorRegister, vendorLogin, getAllVendors,getSingleVendor}