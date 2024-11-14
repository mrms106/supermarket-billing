const express= require("express")
const app= express()

app.get("/",(req,res)=>{
    res.send("working backend")
})

app.listen("8080",(req,res)=>{
    console.log("server started successfully on 8080...")
})