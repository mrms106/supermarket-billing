const mongoose=require("mongoose")
const passportLocalMongoose=require("passport-local-mongoose")
const Schema=mongoose.Schema

const empSchema=new Schema({
    empId:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
    }
});

empSchema.plugin(passportLocalMongoose,{ usernameField:'empId'})

module.exports=mongoose.model('Employee',empSchema)