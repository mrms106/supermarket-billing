const express= require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const app = express()
const products=require("./modules/products")
const passport = require("passport")
const session=require("express-session")
const User=require("./modules/user")
const userRoute=require('./routes/user')
const employeeRoute=require('./routes/employee')
const Employee=require('./modules/employee')

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

// creating session
const sessionOptions={
  secret:"secret",
  resave:false,
  saveUninitialized:false,
  cookie:{
    expires:Date.now()+ 2*24*60*60*1000,
    maxAge: 24 * 60 * 60 * 1000,
    secure:true
}
}
app.use(session(sessionOptions))

// user initialization
app.use(passport.initialize())
app.use(passport.session())

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

passport.use(Employee.createStrategy())
passport.serializeUser(Employee.serializeUser())
passport.deserializeUser(Employee.deserializeUser())

// parse data
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("working backend")
})

// using routes

app.use('/api',userRoute)
app.use('/api/employee',employeeRoute)

app.listen("8080",(req,res)=>{
    console.log("server started successfully on 8080 port")
})