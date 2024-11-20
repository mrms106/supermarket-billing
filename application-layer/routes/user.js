const express=require('express')
const router=express.Router()
const usercontroller=require('../controllers/user')
const passport = require('passport')

router.post('/signup',usercontroller.signup)
router.post('/login',passport.authenticate('user-local'),usercontroller.login)
router.get('/logout',usercontroller.logout)



module.exports=router;