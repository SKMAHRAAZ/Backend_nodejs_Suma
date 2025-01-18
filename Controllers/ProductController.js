const { message } = require('prompt')
const Firm = require('../Models/Firm.js')
const Product = require('../Models/Product.js')

const multer = require('multer')

const storage = multer.diskStorage({
    destination:'uploads/',
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"_"+path.extname(file.originalname))
    }
})

const upload = multer({storage:storage})



const addProduct = async(req,res)=>{

    try {

        const {productname, price, category, bestSeller, description} = req.body

        const image = req.file ? req.file.filename:undefined

        const firmId = req.params.id

        const firm = await Firm.findById(firmId)
        if(!firm){
            res.status(404).send({error:"firm not found"})
        }

        const products = new Product({
            productname, price, category, bestSeller,description, image, firm:firm._id
        })

        const savedProducts = await products.save()
        firm.product.push(savedProducts)
        firm.save()
        res.status(200).send({message:"Product sucessfully added to firm"})
        
    } catch (error) {

        console.log(error)
        res.status(500).send({error:"Internal error occured"})
        
    }
}


const getProductbyFirmId = async(req,res)=>{
   try {

    const firmId = req.params.id

    const firm = await Firm.findById(firmId)
    if(!firm){
        res.status(404).send({message:"no firm found"})
    }

    const resturantname = firm.firmname

    const products = await Product.find({firm:firmId})
     if(!products){
        res.status(404).send({message: "no products found"})
     }
     res.status(200).send({resturantname, products})
    
   } catch (error) {

    console.log(error)
    res.status(500).send({error:"Internal error occured"})
    
   }


}
const deleteProductById = async(req,res)=>{

    try {

        const productId = req.params.id

    const deleteProduct = await Product.findByIdAndDelete(productId)

    if(!deleteProduct){
        res.status(404).json({message:"no product found"})
    }

    res.status(200).send({message:"product deleted sucessfully"})
        
    } catch (error) {

        console.log(error)
        res.status(500).send({error:"Internal error occured"})
        
    }
}
module.exports = {addProduct:[upload.single('image'), addProduct], getProductbyFirmId, deleteProductById}