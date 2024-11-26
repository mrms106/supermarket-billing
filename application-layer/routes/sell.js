const express=require('express')
const router=express.Router()
const sellcontroller=require("../controllers/sell")

router.post("/sell",sellcontroller.Sell)

router.post('/updateStock', sellcontroller.updateStocks);

router.get("/allsales",sellcontroller.allsales)
router.get("/todaysells",sellcontroller.todaySales)
  

module.exports=router