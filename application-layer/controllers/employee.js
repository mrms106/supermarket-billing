const passport=require('passport')
const employee=require('../modules/employee')

module.exports.signup=async(req,res)=>{
    const {empId,name,password}=req.body
    console.log(empId,name)
    const user = new employee({ empId,name });
    try{
        employee.register(user,password,(err,user)=>{
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