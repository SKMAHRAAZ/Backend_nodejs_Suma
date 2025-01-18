const Product = require('../Controllers/ProductController')
const express = require('express')
const router = express.Router()

router.post('/add-product/:id',Product.addProduct)
router.get('/:id/products', Product.getProductbyFirmId)
router.post('/uploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName
    res.headersSent('Content-Type','image/jpeg')
    res.sendFile(path.join(__dirname,'..','uploads', imageName))
})
router.delete('/delete/:id',Product.deleteProductById)

module.exports = router