const passport=require('passport')
const User=require('../modules/user')

module.exports.signup=async(req,res)=>{
    const {email,password}=req.body
    const user = new User({ email });
    try{
        User.register(user,password,(err,user)=>{
            if(err){
                return res.status(500).json({ message: 'Registration failed', error: err.message });
            }
            passport.authenticate('local')(req,res,()=>{
                res.status(201).json({ message: 'Registration successful', user });
            })
        })
    }catch(err){
        console.log(err)
        res.status(400).json({message:"something went wrong"})
    }
  }