const express= require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const app = express()

// database connection
main().catch(err => console.log(err));

async function main() {
 const databaseUrl='mongodb://127.0.0.1:27017/supermarket'
  await mongoose.connect(databaseUrl);
  console.log("The Database is Connected....")
}

app.get("/",(req,res)=>{
    res.send("working backend")
})

app.listen("8080",(req,res)=>{
    console.log("server started successfully on 8080...")
})