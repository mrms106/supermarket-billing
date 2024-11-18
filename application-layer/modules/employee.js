const mongoose=require("mongoose")
const Schema=mongoose.Schema

const empSchema=new Schema({
    empID:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
    }
});


module.exports=mongoose.model('Employee',empSchema)