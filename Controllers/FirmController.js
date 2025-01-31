const Vendor = require('../Models/Vendor')
const Firm = require('../Models/Firm')
const multer = require('multer')
const path = require("path")

const storage = multer.diskStorage({
    destination:'uploads/',
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'_'+ path.extname(file.originalname))
    }
})

const upload = multer({storage:storage})


const addfirm = async(req,res)=>{
    try {

        const {firmname, area, category, region, offer, } = req.body

        const image = req.file ? req.file.filename:undefined

        const vendor = await Vendor.findById(req.vendorId)
        if(!vendor){
            res.status(404).send({error:'vendor not found'})
        }
        if(vendor.firm.length > 0){
           return res.status(400).send({message:"vendor should have only firm"})

        }

        const firm = new Firm({
            firmname,area,category,region,offer,image,vendor:vendor._id
        })

       const savefirm = await firm.save()

       vendor.firm.push(savefirm)
       vendor.save()
       const firmId = savefirm._id
       const vendorFirmName = savefirm.firmname
       console.log("firm added successfully", firmId)
         res.status(200).send({message:"firm added sucessfully", firmId, vendorFirmName})
       

        
        
    } catch (error) {
        console.log(error)
        res.status(500).send({error:"Internal error occured"})
    }
}


const deleteFirmById = async(req,res)=>{

    try {

        const firmId = req.params.id

    const deleteFirm = await Firm.findByIdAndDelete(firmId)

    if(!deleteFirm){
        res.status(404).json({message:"no product found"})
    }

    res.status(200).send({message:"firm deleted sucessfully"})
        
    } catch (error) {

        console.log(error)
        res.status(500).send({error:"Internal error occured"})
        
    }
}

module.exports = {addfirm:[upload.single('image'), addfirm],deleteFirmById}