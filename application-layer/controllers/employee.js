const passport=require('passport')
const employee=require('../modules/employee')

module.exports.signup=async(req,res)=>{
    const {empId,name}=req.body;
    const password=empId
    console.log(empId,name,password)
    const user = new employee({ empId,name });
    try{
        employee.register(user,password,(err,user)=>{
            if(err){
                return res.status(500).json({ message: 'Registration failed', error: err.message });
            }
           
                res.status(201).json({ message: 'Registration successful', user });
            
        })
    }catch(err){
        console.log(err)
        res.status(400).json({message:"something went wrong",error: err.message})
    }
  }

  module.exports.login = (req, res, next) => {
    console.log("Received login request");
    passport.authenticate("employee-local", (err, user, info) => {
        if (err) {
            console.error("Authentication error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // If authentication is successful
        req.login(user, (err) => {
            if (err) {
                console.error("Login error:", err);
                return res.status(500).json({ message: "Failed to log in" });
            }
            return res.status(200).json({ message: "Login successful", user });
        });
    })(req, res, next); // Call passport middleware
};


  module.exports.logout=async(req,res)=>{
    req.logout((err)=>{
        if(err){
            res.status(500).json({ message: 'failed to logout', error: err.message });
            return next(err)
        }
        res.status(200).json({message:"logout successfull"})
    })
  }

  module.exports.employeeData=async(req,res)=>{
    try{
        const employees= await employee.find({})
        res.status(200).json({message:"employees as following",employees:employees})
    }catch(err){
        console.log(err)
        res.status(404).json({message:"error to get employees",err:err})
    }
  }

module.exports.deleteEployee=async(req,res)=>{
    const empId=req.params.id;
    try{
        await employee.findByIdAndDelete(empId)
        res.status(200).json({message:'employee is removed from database succefully'})
    }catch(err){
        console.log(err)
        res.status(404).json({message:"error to get employees",err:err})
    }
}