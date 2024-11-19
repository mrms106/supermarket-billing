const express=require('express')
const router=express.Router()
const productcontroller=require('../controllers/product')

router.get("/product",productcontroller.products)
router.post("/addproduct",productcontroller.addproduct)
router.post("/updateproduct/:id",productcontroller.updateproduct)
router.delete('/deleteproduct/:id',productcontroller.deleteproduct)


module.exports=router