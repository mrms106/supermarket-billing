const express= require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const app = express()

// database connection
main().catch(err => console.log(err));

async function main() {
 const databaseUrl='mongodb://127.0.0.1:27017/supermarket'
  await mongoose.connect(databaseUrl);
  console.log("Connected to the Database successfully")
}

// cors configaration 
const coreOptions={
    origin:"http://localhost:5173",
    methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials:true
  }
app.use(cors(coreOptions))

app.get("/",(req,res)=>{
    res.send("working backend")
})

app.listen("8080",(req,res)=>{
    console.log("server started successfully on 8080 port")
})