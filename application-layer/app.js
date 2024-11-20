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
const productRoute=require('./routes/product')
const Employee=require('./modules/employee')
const MongoStore = require('connect-mongo');
const LocalStrategy = require('passport-local').Strategy;


// database connection
const databaseUrl='mongodb://127.0.0.1:27017/supermarket'
main().catch(err => console.log(err));

async function main() {
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
const store=MongoStore.create({
  mongoUrl:databaseUrl,
  crypto:{
    secret:"secret"
  },
  touchAfter:24*3600
})

const sessionOptions={
  store,
  secret:"secret",
  resave:false,
  saveUninitialized:false,
  cookie:{
    expires:Date.now()+ 2*24*60*60*1000,
    maxAge: 24 * 60 * 60 * 1000,
   
}
}
app.use(session(sessionOptions))

// user initialization
app.use(passport.initialize())
app.use(passport.session())

// Passport strategies for User and Employee
passport.use('user-local', User.createStrategy());
passport.use('employee-local', Employee.createStrategy());

// Serialize and deserialize logic
passport.serializeUser((entity, done) => {
  if (entity instanceof User) {
    done(null, { id: entity.id, type: 'User' });
  } else if (entity instanceof Employee) {
    done(null, { id: entity.id, type: 'Employee' });
  }
});

passport.deserializeUser((data, done) => {
  if (data.type === 'User') {
    User.findById(data.id, done);
  } else if (data.type === 'Employee') {
    Employee.findById(data.id, done);
  }
});
// parse data
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.send("working backend")
})

// using routes

app.use('/api',userRoute)
app.use('/api/employee',employeeRoute)
app.use('/api',productRoute)

app.listen("8080",(req,res)=>{
    console.log("server started successfully on 8080 port")
})