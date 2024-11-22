const express=require('express')
const router=express.Router()
const productcontroller=require('../controllers/product')

router.get("/product",productcontroller.products)
router.post("/addproduct",productcontroller.addproduct)
router.get("/updateproduct/:id",productcontroller.getproduct)
router.post("/updateproduct/:id",productcontroller.updateproduct)
router.delete('/deleteproduct/:id',productcontroller.deleteproduct)
router.patch("/addremovecart/:id",productcontroller.addorRemovecart)


module.exports=router