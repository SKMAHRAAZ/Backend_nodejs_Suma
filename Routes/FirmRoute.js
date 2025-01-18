const firmController = require('../Controllers/FirmController')
const VerifyToken = require('../Middleware/VerifyToken')
const express = require('express')


const router = express.Router()


router.post('/add-firm', VerifyToken, firmController.addfirm)
router.delete('/delete/:id', firmController.deleteFirmById)

module.exports = router