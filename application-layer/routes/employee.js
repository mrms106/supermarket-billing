const express=require('express')
const router=express.Router()
const employeecontroller=require('../controllers/employee')
const passport = require('passport')

router.post('/signup',employeecontroller.signup)
router.post('/login',passport.authenticate('local'),employeecontroller.login)
router.get('/logout',employeecontroller.signup)



module.exports=router;