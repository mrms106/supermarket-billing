const express=require('express')
const router=express.Router()
const employeecontroller=require('../controllers/employee')
const passport = require('passport')

router.post('/signup',employeecontroller.signup)
router.post('/login',passport.authenticate('employee-local'),employeecontroller.login)
router.get('/logout',employeecontroller.signup)
router.get("/employeedata",employeecontroller.employeeData)
router.delete("/deleteemp/:id",employeecontroller.deleteEployee)



module.exports=router;