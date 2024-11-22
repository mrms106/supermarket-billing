const passport=require('passport')
const User=require('../modules/user')

module.exports.signup=async(req,res)=>{
    const {email,name,password}=req.body
    const user = new User({ email,name });
    try{
        User.register(user,password,(err,user)=>{
            if(err){
                return res.status(500).json({ message: 'Registration failed', error: err.message });
            }
            passport.authenticate('user-local')(req,res,()=>{
                res.status(201).json({ message: 'Registration successful', user });
            })
        })
    }catch(err){
        console.log(err)
        res.status(400).json({message:"something went wrong"})
    }
  }

  module.exports.login=(req,res)=>{
        res.status(200).json({ message: 'Login successful', user: req.user });
        
  }

  module.exports.logout=async(req,res)=>{
    req.logout((err)=>{
        if(err){
            res.status(500).json({ message: 'failed to logout', error: err.message });
            return next(err)
        }
        res.status(200).json({message:"logout successfull"})
    })
  }

module.exports.curruser=(req,res)=>{
    const   user=req.user
       try{
       res.status(201).json({user})
       }catch(err){
           res.status(500).json({message:"error in get user"})
       }
   }
   